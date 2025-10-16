'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { ModalCards } from '@/shared/constants';
import { Card } from '@/shared/interfaces';
import {
  ShoppingCart,
  CreditCard,
  Package,
  RotateCcw,
  Users,
  Box,
  UserCog,
  BarChart3,
  Settings,
  Scale,
  Lock,
  Wallet,
  LogOut,
} from 'lucide-react';
import { useRoot } from '@/shared/functions';
import { Modal } from '@/views/Modal';
interface Store {
  id: number;
  name: string;
  address: string;
}

interface DashboardCard extends Card{
  title: string;
  route: string;
  icon: React.ReactNode;
  color: string;
  onclick?: string;
}

export default function DashboardPage() {
  // const { isModalOpen, setIsModalOpen,  closeModal, handleCardClick, getCardsListing, handleModalCards, initModal ,

  // } = useModalFunctions();
  // const router = useRouter();
  // let root : {[key:string] : [
  //   any,
  //   (el:any)=>void
  // ]} = useRoot()
  const root = useRoot()
  const verifyUserLoggedIn = async (): Promise<boolean> => {
    try {
      // check for token in localStorage
      const token = localStorage.getItem('token');
      if (!token) return false;
      // Optionally, verify token validity with backend
      // const res = await fetch('http:
      return true;
    }catch (error) {
      console.error('Error verifying user login:', error);
      return false;
    }
  };
  useEffect(() => {
    // Check if the user is logged in
    const checkAuth = async () => {
      // const router = useRouter();
      const isLoggedIn = await verifyUserLoggedIn();
      if (!isLoggedIn) {
        root.router.push('/login'); // Redirect to login if not authenticated
      }
    };

    checkAuth();
    fetchStores();
  }, []);
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>('');
  root.putState("stores",[stores, setStores])
  root.putState("selectedStore",[selectedStore, setSelectedStore])

  // const [loading, setLoading] = useState(true);
  // root["stores"] = [stores,setStores];

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    
    try {
      const response = await fetch('http://localhost:8000/api/stores');
      const data = await response.json();
      setStores(data);
      if (data.length > 0) {
        setSelectedStore(data[0].id.toString());
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
    } finally {
      root.setLoading(false);
    }
  };
  
  const cards: DashboardCard[] = [
    {
      title: 'Sell',
      route: '/sell',
      icon: <ShoppingCart className="w-12 h-12" />,
      color: 'from-blue-500 to-blue-600'
      // ,onclick: 'modal'
    },
    {
      title: 'Cashier Operations',
      route: '/cashierOperations',
      icon: <CreditCard className="w-12 h-12" />,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Stock Management',
      route: '/stockManagement',
      icon: <Package className="w-12 h-12" />,
      color: 'from-purple-500 to-purple-600',
      onclick: 'modal'
    },
    {
      title: 'Item Returns',
      route: '/itemReturns',
      icon: <RotateCcw className="w-12 h-12" />,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Users Management',
      route: '/usersManagement',
      icon: <Users className="w-12 h-12" />,
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Products Management',
      route: '/productsManagement',
      icon: <Box className="w-12 h-12" />,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Third Parties Management',
      route: '/thirdPartiesManagement',
      icon: <UserCog className="w-12 h-12" />,
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      title: 'Statistics',
      route: '/statistics',
      icon: <BarChart3 className="w-12 h-12" />,
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Settings',
      route: '/settings',
      icon: <Settings className="w-12 h-12" />,
      color: 'from-gray-500 to-gray-600'
    },
    {
      title: 'Scales',
      route: '/scales',
      icon: <Scale className="w-12 h-12" />,
      color: 'from-amber-500 to-amber-600'
    },
    {
      title: 'Closures',
      route: '/closures',
      icon: <Lock className="w-12 h-12" />,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Payment Methods',
      route: '/paymentMethods',
      icon: <Wallet className="w-12 h-12" />,
      color: 'from-emerald-500 to-emerald-600'
    }
  ];




  

  const handleExit = () => {
    root.router.push('/login');
  };
    // const [selectedCard,setSelectedCard] = root.selectedCard
    // const [history,setHistory] = root.history
    // const [isModalOpen, setIsModalOpen] = root.isModalOpen

  // var selectedModal = '';
  const handleCardClick = (card:Card) => {
    const [route, onclick, modalT] = [card.route, card.onclick, card.modalType];
    
    if (onclick === 'modal') {
        // const instance: [Card | null, string,number] = [selectedCard, selectedModal,modalType];

        if (root.selectedCard != null) {
            root.history.current.push(root.selectedCard); // Push to the ref's current value
            console.log('History after push:', root.history.current);
        }

        // Trim history to keep only the last 2 entries
        if (root.history.current.length > 3) {
            root.history.current = root.history.current.slice(-3);
        }
        // setSelectedModal(route);
        // setModalType(modalT ? modalT : 1);
        root.setSelectedCard(card);
        root.setIsModalOpen(true);
    } else {
        root.router.push(route);
    }
  };
  root.putState("handleCardClick",[handleCardClick,null])
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-black">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SS</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              ShadySolution
            </h1>

            {/* Spacer for alignment */}
            <div className="w-12"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Store Selection */}
        <div className="flex justify-center mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-4">
            <label className="text-lg font-semibold text-gray-700 whitespace-nowrap">
                Store
            </label>

            {root.loading ? (
                <div className="animate-pulse bg-gray-200 h-12 rounded-lg flex-1"></div>
            ) : (
                <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="flex-1 px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                    {store.name} - {store.address}
                    </option>
                ))}
                </select>
            )}
            </div>
        </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(card)}
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="p-6 flex flex-col items-center space-y-4">
                <div className={`bg-gradient-to-br ${card.color} p-4 rounded-full text-white group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  {card.title}
                </h3>
              </div>
              <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${card.color} transition-all duration-300`}></div>
            </button>
          ))}
        </div>
          {/* Modal */}
      {root.isModalOpen && <Modal
        root={root}
      />}
        {/* Exit Button */}
        <div className="flex justify-center">
          <button
            onClick={handleExit}
            className="group bg-white hover:bg-red-50 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 px-8 py-4 flex items-center space-x-3"
          >
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-full text-white group-hover:scale-110 transition-transform duration-300">
              <LogOut className="w-6 h-6" />
            </div>
            <span className="text-lg font-semibold text-gray-800">Exit</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 pb-6 text-center text-gray-500 text-sm">
        <p>© 2025 ShadySolution. All rights reserved.</p>
      </footer>
    </div>
  );
}