import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  StatusBar,
  FlatList,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../contexts/ThemeContext';
import {mockData} from '../utils/mockData';
import {currency, formatDate} from '../utils/helpers';
import Badge from '../components/Badge';
import Button from '../components/Button';
import {Transaction} from '../types';

type DashboardStackParamList = {
  Auth: undefined;
  Dashboard: {user: {email: string}};
};

type DashboardScreenNavigationProp = StackNavigationProp<
  DashboardStackParamList,
  'Dashboard'
>;

interface StatCardProps {
  label: string;
  value: string;
  iconName: string;
}

const StatCard: React.FC<StatCardProps> = ({label, value, iconName}) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.statCard, {backgroundColor: colors.surface}]}>
      <View style={[styles.statIcon, {backgroundColor: colors.primary}]}>
        <Icon name={iconName} size={20} color={colors.surface} />
      </View>
      <View style={styles.statContent}>
        <Text style={[styles.statLabel, {color: colors.textSecondary}]}>
          {label}
        </Text>
        <Text style={[styles.statValue, {color: colors.text}]}>{value}</Text>
      </View>
    </View>
  );
};

interface QuickActionProps {
  label: string;
  iconName: string;
  onPress: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({
  label,
  iconName,
  onPress,
}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[styles.quickAction, {backgroundColor: colors.surface}]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.quickActionContent}>
        <Icon name={iconName} size={20} color={colors.textSecondary} />
        <Text style={[styles.quickActionLabel, {color: colors.text}]}>
          {label}
        </Text>
      </View>
      <Icon name="arrow-up-right" size={16} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

interface TransactionRowProps {
  transaction: Transaction;
}

const TransactionRow: React.FC<TransactionRowProps> = ({transaction}) => {
  const {colors} = useTheme();
  const isPositive = transaction.amount >= 0;

  const getBadgeTone = () => {
    if (isPositive) return 'green';
    if (transaction.category === 'Bill') return 'amber';
    return 'slate';
  };

  return (
    <View style={[styles.transactionRow, {borderBottomColor: colors.border}]}>
      <View style={styles.transactionHeader}>
        <Text style={[styles.transactionDate, {color: colors.textSecondary}]}>
          {formatDate(transaction.date)}
        </Text>
        <View style={styles.transactionAmount}>
          <Icon
            name={isPositive ? 'arrow-down-right' : 'arrow-up-right'}
            size={16}
            color={isPositive ? colors.success : colors.error}
          />
          <Text
            style={[
              styles.transactionAmountText,
              {color: isPositive ? colors.success : colors.error},
            ]}>
            {currency(transaction.amount)}
          </Text>
        </View>
      </View>
      <Text style={[styles.transactionDesc, {color: colors.text}]}>
        {transaction.desc}
      </Text>
      <View style={styles.transactionFooter}>
        <Text style={[styles.transactionRef, {color: colors.textSecondary}]}>
          Ref: {transaction.refCode}
        </Text>
        <Badge tone={getBadgeTone()}>{transaction.category}</Badge>
      </View>
    </View>
  );
};

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const route = useRoute();
  const {colors, isDark, toggleTheme} = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredTransactions = useMemo(() => {
    return mockData.transactions.filter(transaction => {
      const matchesQuery = searchQuery
        ? `${transaction.date} ${transaction.desc} ${transaction.category} ${transaction.refCode}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true;
      const matchesType =
        typeFilter === 'all'
          ? true
          : transaction.category.toLowerCase() === typeFilter.toLowerCase();
      return matchesQuery && matchesType;
    });
  }, [searchQuery, typeFilter]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.navigate('Auth'),
        },
      ],
    );
  };

  const handleQuickAction = (actionName: string) => {
    Alert.alert('Quick Action', `${actionName} flow - demo`);
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* Header */}
      <View style={[styles.header, {backgroundColor: colors.surface}]}>
        <View style={styles.headerLeft}>
          <View style={[styles.bankLogo, {backgroundColor: colors.primary}]}>
            <Text style={[styles.bankLogoText, {color: colors.surface}]}>
              US
            </Text>
          </View>
          <View>
            <Text style={[styles.bankName, {color: colors.textSecondary}]}>
              US BANK
            </Text>
            <Text style={[styles.accountInfo, {color: colors.text}]}>
              {mockData.accountName}{' '}
              <Text style={{color: colors.textSecondary}}>
                {mockData.accountNoMasked}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Badge tone="red">
            <Icon name="shield-check" size={14} color={colors.error} />
            <Text style={{marginLeft: 4}}>{mockData.status}</Text>
          </Badge>
          <TouchableOpacity
            style={[styles.iconButton, {borderColor: colors.border}]}
            onPress={toggleTheme}>
            <Icon
              name={isDark ? 'sun' : 'moon'}
              size={16}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconButton, {borderColor: colors.border}]}
            onPress={handleLogout}>
            <Icon name="log-out" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconButton, {borderColor: colors.border}]}>
            <Icon name="bell" size={16} color={colors.textSecondary} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Balance Section */}
        <View style={styles.balanceSection}>
          <View style={[styles.balanceCard, {backgroundColor: colors.surface}]}>
            <View style={styles.balanceHeader}>
              <View>
                <Text style={[styles.balanceLabel, {color: colors.textSecondary}]}>
                  Total Balance
                </Text>
                <Text style={[styles.balanceValue, {color: colors.text}]}>
                  {currency(mockData.balance)}
                </Text>
                <Text style={[styles.availableText, {color: colors.textSecondary}]}>
                  Available: {currency(mockData.available)}
                </Text>
              </View>
              <Badge tone="slate">
                <Icon name="zap" size={12} color={colors.textSecondary} />
                <Text style={{marginLeft: 4, fontSize: 10}}>
                  Updated • {mockData.lastUpdated}
                </Text>
              </Badge>
            </View>
            <View style={styles.statsGrid}>
              <StatCard label="Cards on file" value="3" iconName="credit-card" />
              <StatCard label="Scheduled payments" value="2" iconName="calendar" />
              <StatCard label="FX accounts" value="USD • EUR • CAD" iconName="refresh-ccw" />
            </View>
          </View>

          {/* Account Info Card */}
          <View style={[styles.accountCard, {backgroundColor: colors.primary}]}>
            <Text style={[styles.accountLabel, {color: colors.surface + 'CC'}]}>
              Account Holder
            </Text>
            <Text style={[styles.accountName, {color: colors.surface}]}>
              {mockData.owner}
            </Text>
            <View style={styles.accountDetails}>
              <View style={styles.accountDetailRow}>
                <Text style={[styles.accountDetailLabel, {color: colors.surface + 'CC'}]}>
                  Risk Protection
                </Text>
                <Badge tone="green">Enabled</Badge>
              </View>
              <View style={styles.accountDetailRow}>
                <Text style={[styles.accountDetailLabel, {color: colors.surface + 'CC'}]}>
                  2FA
                </Text>
                <Badge tone="green">On</Badge>
              </View>
              <View style={styles.accountDetailRow}>
                <Text style={[styles.accountDetailLabel, {color: colors.surface + 'CC'}]}>
                  Spending Limit
                </Text>
                <Text style={[styles.accountDetailValue, {color: colors.surface}]}>
                  $25,000 / day
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, {color: colors.text}]}>
              Quick actions
            </Text>
            <Text style={[styles.sectionSubtitle, {color: colors.textSecondary}]}>
              Tap to start a flow
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.quickActionsContainer}>
              {mockData.actions.map(action => (
                <QuickAction
                  key={action.id}
                  label={action.label}
                  iconName={action.iconName}
                  onPress={() => handleQuickAction(action.label)}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Transactions */}
        <View style={styles.transactionsSection}>
          <View style={[styles.transactionsCard, {backgroundColor: colors.surface}]}>
            <View style={styles.transactionsHeader}>
              <Text style={[styles.sectionTitle, {color: colors.text}]}>
                Transaction history
              </Text>
              <View style={styles.transactionsFilters}>
                <View style={[styles.searchContainer, {borderColor: colors.border}]}>
                  <Icon name="search" size={16} color={colors.textSecondary} />
                  <TextInput
                    style={[styles.searchInput, {color: colors.text}]}
                    placeholder="Search date, ref, details…"
                    placeholderTextColor={colors.textSecondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
              </View>
            </View>
            <FlatList
              data={filteredTransactions}
              keyExtractor={item => item.id}
              renderItem={({item}) => <TransactionRow transaction={item} />}
              scrollEnabled={false}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={[styles.emptyText, {color: colors.textSecondary}]}>
                    No transactions match your filters.
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#0001',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  bankLogo: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankLogoText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bankName: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  accountInfo: {
    fontSize: 14,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#dc2626',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  balanceSection: {
    padding: 16,
    gap: 16,
  },
  balanceCard: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 14,
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: '600',
    marginTop: 4,
  },
  availableText: {
    fontSize: 14,
    marginTop: 4,
  },
  statsGrid: {
    gap: 12,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 2,
  },
  accountCard: {
    borderRadius: 24,
    padding: 24,
  },
  accountLabel: {
    fontSize: 14,
  },
  accountName: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 16,
  },
  accountDetails: {
    gap: 12,
  },
  accountDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountDetailLabel: {
    fontSize: 14,
  },
  accountDetailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  quickActionsSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionSubtitle: {
    fontSize: 14,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 16,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  transactionsSection: {
    padding: 16,
    paddingBottom: 32,
  },
  transactionsCard: {
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  transactionsHeader: {
    marginBottom: 16,
  },
  transactionsFilters: {
    marginTop: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 4,
  },
  transactionRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
  },
  transactionAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  transactionAmountText: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionDesc: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    lineHeight: 20,
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionRef: {
    fontSize: 12,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
  },
});

export default DashboardScreen;
