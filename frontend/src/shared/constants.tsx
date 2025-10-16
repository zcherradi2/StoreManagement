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
import { Card,Doc,Inventory } from './interfaces';
import tableWrapper from "./model"
import { Listing } from '@/modals/Modal';
import TableWrapper from './model';
import { CustomView } from './CustomView';

export const ModalCards: { [key: string]: [string, { [key: string]: Card }] } = {
  stockManagement: [
    'Stock Management',
    {
      stockEntry: {
        title: 'Stock Entry',
        route: '/stockEntry',
        icon: <Box className="w-12 h-12" />,
        color: 'from-blue-500 to-blue-600',
        onclick: 'modal',
        modalType: 2,
        listing:Doc,
        addCard:{
          title: 'create new Entry',
          route: '/CreateNewEntry',
          icon: <Box className="w-12 h-12" />,
          color: 'from-blue-500 to-blue-600',
          onclick: 'modal',
          modalType: 3,
          view:CustomView('newEntry')

        }
      },
      stockExit: {
        title: 'Stock Exit',
        route: '/stockExit',
        icon: <RotateCcw className="w-12 h-12" />,
        color: 'from-red-500 to-red-600',
        onclick: 'modal',
        modalType: 2,
        listing:Doc,
      },
      // stockInventory: {
      //   title: 'Stock Inventory',
      //   route: '/stockInventory',
      //   icon: <BarChart3 className="w-12 h-12" />,
      //   color: 'from-green-500 to-green-600',
      //   onclick: 'modal',
      //   modalType: 2,
      //   listing:new TableWrapper<Inventory>("inventory",Inventory)
      // },
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