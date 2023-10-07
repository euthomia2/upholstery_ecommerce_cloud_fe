import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import Login from './pages/login/Login';
import Dashboard from './pages/portal/Dashboard';
import Sellers from './pages/portal/seller/Sellers';
import Customers from './pages/portal/customer/Customers';
import AccountDetails from './pages/portal/AccountDetails';
import Products from './pages/portal/Products';
import Deliveries from './pages/portal/Deliveries';
import DiscountVouchers from './pages/portal/DiscountVouchers';
import Transactions from './pages/portal/Transactions';
import Reviews from './pages/portal/Reviews';
import ReturnsAndRefunds from './pages/portal/ReturnsAndRefunds';
import Logs from './pages/portal/Logs';
import AddNewSeller from './pages/portal/seller/AddNewSeller';
import AddNewCustomer from './pages/portal/customer/AddNewCustomer';
import ViewCustomer from './pages/portal/customer/ViewCustomer';
import ViewSeller from './pages/portal/seller/ViewSeller';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/portal/dashboard' element={<Dashboard />} />
        <Route path='/portal/sellers'>
          <Route index element={<Sellers />} />
          <Route path='view/:sellerId' element={<ViewSeller />} />
          <Route path='add' element={<AddNewSeller />} />
        </Route>
        <Route path='/portal/customers'>
          <Route index element={<Customers />} />
          <Route path='view/:customerId' element={<ViewCustomer />} />
          <Route path='add' element={<AddNewCustomer />} />
        </Route>
        <Route path='/portal/products' element={<Products />} />
        <Route path='/portal/deliveries' element={<Deliveries />} />
        <Route
          path='/portal/discount-vouchers'
          element={<DiscountVouchers />}
        />
        <Route path='/portal/transactions' element={<Transactions />} />
        <Route path='/portal/reviews' element={<Reviews />} />
        <Route
          path='/portal/returns-and-refunds'
          element={<ReturnsAndRefunds />}
        />
        <Route path='/portal/logs' element={<Logs />} />
        <Route path='/portal/account-details' element={<AccountDetails />} />
        <Route path='/' element={<Navigate to='/login' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
