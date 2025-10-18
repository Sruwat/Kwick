import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { BlogProvider } from './contexts/BlogContext';
import { UnifiedNavbar } from './components/UnifiedNavbar';
import { Footer } from './components/Footer';

// Public Pages
import { NewLandingPage } from './components/NewLandingPage';
import { NewAboutPage } from './components/NewAboutPage';
import { EnhancedVehiclesPage } from './components/EnhancedVehiclesPage';
import { PricingPage } from './components/PricingPage';
import { BatteryStationsPage } from './components/BatteryStationsPage';
import { BlogPage } from './components/BlogPage';
import { CareersPage } from './components/CareersPage';
import { EnhancedContactPage } from './components/EnhancedContactPage';

// User Pages
import { EnhancedUserDashboard } from './components/EnhancedUserDashboard';
import { EnhancedKYCPageWithLanguage } from './components/EnhancedKYCPageWithLanguage';
import { EnhancedRentVehiclePage } from './components/EnhancedRentVehiclePage';
import { MyFleetPage } from './components/MyFleetPage';
import { MyPaymentPage } from './components/MyPaymentPage';
import { BatterySwapPage } from './components/BatterySwapPage';
import { IoTTrackingPage } from './components/IoTTrackingPage';
import { SupportPage } from './components/SupportPage';

// Blog
import { BlogDetailPage } from './components/BlogDetailPage';

// Admin Pages
import { EnhancedAdminDashboard } from './components/EnhancedAdminDashboard';
import { UserManagementPanel } from './components/admin/UserManagementPanel';
import { KYCManagementPanel } from './components/admin/KYCManagementPanel';
import { PaymentManagementPanel } from './components/admin/PaymentManagementPanel';
import { FleetManagementPanel } from './components/admin/FleetManagementPanel';
import { BlogCMSPanel } from './components/admin/BlogCMSPanel';
import { CareerCMSPanel } from './components/admin/CareerCMSPanel';
import { NotificationsPanel } from './components/admin/NotificationsPanel';

import { Toaster } from './components/ui/sonner';
import AdminTopbar from './components/AdminTopbar';
import { useAuth } from './contexts/AuthContext';
import { AdminLogin } from './components/AdminLogin';

export default function App() {
  const { isAdmin, viewMode } = useAuth();
  const [activePage, setActivePage] = useState(() => {
    const path = window.location.pathname;
    // Map supported URL paths to activePage
    if (path === '/admin-secret-login') return 'admin-login';
    if (path === '/admin') return 'admin-dashboard';
    if (path === '/admin/users') return 'admin-users';
    if (path === '/admin/kyc') return 'admin-kyc';
    return 'home';
  });

  const handleNavigate = (page: string) => {
    // If navigating to admin pages, ensure user is admin and switched to admin view
    const isTargetAdmin = page.startsWith('admin-');
    if (isTargetAdmin && !(isAdmin && viewMode === 'admin')) {
      // redirect to secret admin-login if not authorized
      setActivePage('admin-login');
      window.history.pushState({}, '', '/admin-secret-login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setActivePage(page);
    // update browser URL for admin pages
    if (page === 'admin-login') window.history.pushState({}, '', '/admin-secret-login');
    if (page === 'admin-dashboard') window.history.pushState({}, '', '/admin');
    if (page === 'admin-users') window.history.pushState({}, '', '/admin/users');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (activePage) {
      // Public Pages
      case 'home':
        return <NewLandingPage onNavigate={handleNavigate} />;
      case 'about':
        return <NewAboutPage onNavigate={handleNavigate} />;
      case 'vehicles':
        return <EnhancedVehiclesPage onNavigate={handleNavigate} />;
      case 'pricing':
        return <PricingPage onNavigate={handleNavigate} />;
      case 'battery-stations':
        return <BatteryStationsPage onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'careers':
        return <CareersPage onNavigate={handleNavigate} />;
      case 'contact':
        return <EnhancedContactPage onNavigate={handleNavigate} />;

      // User Dashboard
      case 'user-dashboard':
        return <EnhancedUserDashboard onNavigate={handleNavigate} />;
      case 'kyc':
        return <EnhancedKYCPageWithLanguage onNavigate={handleNavigate} />;
      case 'rent':
        return <EnhancedRentVehiclePage onNavigate={handleNavigate} />;
      case 'fleet':
        return <MyFleetPage onNavigate={handleNavigate} />;
      case 'payments':
        return <MyPaymentPage onNavigate={handleNavigate} />;
      case 'battery-swap':
        return <BatterySwapPage onNavigate={handleNavigate} />;
      case 'iot-tracking':
        return <IoTTrackingPage onNavigate={handleNavigate} />;
      case 'support':
        return <SupportPage onNavigate={handleNavigate} />;

      // Admin Dashboard
      case 'admin-dashboard':
        return <EnhancedAdminDashboard onNavigate={handleNavigate} />;
      case 'admin-login':
        return <AdminLogin onNavigate={handleNavigate} />;
      case 'admin-users':
        return <UserManagementPanel onNavigate={handleNavigate} />;
      case 'admin-kyc':
        return <KYCManagementPanel onNavigate={handleNavigate} />;
      case 'admin-payments':
        return <PaymentManagementPanel onNavigate={handleNavigate} />;
      case 'admin-fleet':
        return <FleetManagementPanel onNavigate={handleNavigate} />;
      case 'admin-blog':
        return <BlogCMSPanel onNavigate={handleNavigate} />;
      case 'admin-careers':
        return <CareerCMSPanel onNavigate={handleNavigate} />;
      case 'admin-notifications':
        return <NotificationsPanel onNavigate={handleNavigate} />;

      default:
        // Handle blog detail pages
        if (activePage.startsWith('blog-detail-')) {
          const blogId = activePage.replace('blog-detail-', '');
          return <BlogDetailPage blogId={blogId} onNavigate={handleNavigate} />;
        }
        return <NewLandingPage onNavigate={handleNavigate} />;
    }
  };

  const isPublicPage = [
    'home',
    'about',
    'vehicles',
    'pricing',
    'battery-stations',
    'blog',
    'careers',
    'contact',
  ].includes(activePage);

  const isAdminPage = activePage.startsWith('admin-') || activePage === 'admin-dashboard' || activePage === 'admin-login';
  const isDashboardPage = !isPublicPage && !isAdminPage;

  return (
    <LanguageProvider>
      <BlogProvider>
        <div
            className="min-h-screen flex flex-col bg-white"
            style={{
              paddingTop: isAdminPage ? 48 : undefined,
              transition: 'margin-left 200ms ease',
              marginLeft: isDashboardPage ? 'var(--user-sidebar-width, 280px)' : undefined,
            }}
          >
            {/* Admin topbar */}
            {isAdminPage && <AdminTopbar />}

            {/* Unified Navbar for public and user dashboard pages only; hide on admin login/dashboard */}
            {!isAdminPage && <UnifiedNavbar currentPage={activePage} onNavigate={handleNavigate} />}

            {/* Main Content */}
            <main className="flex-1">
              {renderPage()}
            </main>

            {/* Footer on non-admin pages */}
            {!isAdminPage && <Footer onNavigate={handleNavigate} />}
            <Toaster position="top-right" />
          </div>
      </BlogProvider>
    </LanguageProvider>
  );
}
