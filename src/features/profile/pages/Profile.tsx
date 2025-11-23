// ============================================================================
// Profile Page
// ============================================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock } from 'lucide-react';
import { SEO } from '../../../shared/components/SEO';
import { ProfileEdit } from '../components/ProfileEdit';
import { ChangePassword } from '../components/ChangePassword';

type Tab = 'profile' | 'password';

export const Profile = () => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const tabs = [
    { id: 'profile' as Tab, label: 'Dados Pessoais', icon: User },
    { id: 'password' as Tab, label: 'Alterar Senha', icon: Lock },
  ];

  return (
    <>
      <SEO
        title="Meu Perfil - Pixelaria"
        description="Gerencie suas informações pessoais e configurações de conta"
      />

      <div className="min-h-screen bg-background-light py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-black text-neutral-900 mb-3">
              Meu Perfil
            </h1>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="border-b border-neutral-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                        transition-colors
                        ${
                          isActive
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                        }
                      `}
                    >
                      <Icon
                        className={`
                          -ml-0.5 mr-2 h-5 w-5
                          ${isActive ? 'text-primary-600' : 'text-neutral-400 group-hover:text-neutral-500'}
                        `}
                      />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && <ProfileEdit />}
            {activeTab === 'password' && <ChangePassword />}
          </motion.div>
        </div>
      </div>
    </>
  );
};
