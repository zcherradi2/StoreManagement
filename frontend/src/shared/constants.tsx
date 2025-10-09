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
  Book,
  Logs,
  Calendar,
  Bell,
  MessageCircle,
} from 'lucide-react';
import { Card,Inventory } from './interfaces';
import tableWrapper from "./model"

export const ModalCards: { [key: string]: [string, { [key: string]: Card }] } = {
  stockManagement: [
    'Stock Management',
    {
      stockEntry: {
        title: 'Stock Entry',
        route: '/stockEntry',
        icon: <Box className="w-12 h-12" />,
        color: 'from-blue-500 to-blue-600',
      },
      stockExit: {
        title: 'Stock Exit',
        route: '/stockExit',
        icon: <RotateCcw className="w-12 h-12" />,
        color: 'from-red-500 to-red-600',
      },
      stockInventory: {
        title: 'Stock Inventory',
        route: '/stockInventory',
        icon: <BarChart3 className="w-12 h-12" />,
        color: 'from-green-500 to-green-600',
        onclick: 'modal',
        modalType: 2,
        listModel:new tableWrapper<Inventory>("inventory",Inventory)
      },
      // tracking item movements, like when it entered, when it sold, .. etc
      itemTracking: {
        title: 'Item Tracking',
        route: '/itemTracking',
        icon: <Calendar className="w-12 h-12" />,
        color: 'from-purple-500 to-purple-600',
      },
      
      
    },
  ],
};