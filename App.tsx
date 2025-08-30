import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

const App = () => {
  const handleLogin = () => {
    Alert.alert('Login', 'Login functionality will be implemented');
  };

  const handleTransaction = () => {
    Alert.alert('Transaction', 'Transaction functionality will be implemented');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <SafeAreaView style={styles.container}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Fintech Dashboard</Text>
            <Text style={styles.headerSubtitle}>Welcome to your financial hub</Text>
          </View>

          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>$12,347.89</Text>
            <Text style={styles.balanceChange}>+2.5% from last month</Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsContainer}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionButton} onPress={handleTransaction}>
                <Text style={styles.actionIcon}>💸</Text>
                <Text style={styles.actionText}>Send Money</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleTransaction}>
                <Text style={styles.actionIcon}>💰</Text>
                <Text style={styles.actionText}>Receive</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleTransaction}>
                <Text style={styles.actionIcon}>📊</Text>
                <Text style={styles.actionText}>Analytics</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Transactions */}
          <View style={styles.transactionsContainer}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            
            <View style={styles.transactionItem}>
              <Text style={styles.transactionIcon}>🛒</Text>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>Online Shopping</Text>
                <Text style={styles.transactionDate}>Today, 2:30 PM</Text>
              </View>
              <Text style={styles.transactionAmount}>-$89.99</Text>
            </View>

            <View style={styles.transactionItem}>
              <Text style={styles.transactionIcon}>💼</Text>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>Salary Deposit</Text>
                <Text style={styles.transactionDate}>Yesterday</Text>
              </View>
              <Text style={[styles.transactionAmount, styles.positiveAmount]}>+$3,500.00</Text>
            </View>

            <View style={styles.transactionItem}>
              <Text style={styles.transactionIcon}>☕</Text>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>Coffee Shop</Text>
                <Text style={styles.transactionDate}>Yesterday</Text>
              </View>
              <Text style={styles.transactionAmount}>-$4.50</Text>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Access Full Dashboard</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  balanceCard: {
    backgroundColor: '#4f46e5',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  balanceLabel: {
    color: '#e0e7ff',
    fontSize: 16,
    marginBottom: 5,
  },
  balanceAmount: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  balanceChange: {
    color: '#a7f3d0',
    fontSize: 14,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#ffffff',
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4b5563',
  },
  transactionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  transactionItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  transactionDate: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  positiveAmount: {
    color: '#10b981',
  },
  loginButton: {
    backgroundColor: '#4f46e5',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
