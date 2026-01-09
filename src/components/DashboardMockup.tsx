
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, Star, Check } from 'lucide-react';

export const DashboardMockup: React.FC = () => {
  return (
    <div className="relative w-full max-w-[500px] aspect-square lg:aspect-auto lg:h-[600px]">
      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-[0_32px_64px_-12px_rgba(0,86,179,0.12)] border border-slate-100 dark:border-slate-700 p-6 w-full h-full overflow-hidden"
      >
        {/* Header Simulation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          </div>
          <div className="w-32 h-2 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
            <TrendingUp className="w-5 h-5 text-primary dark:text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">142%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Practice Growth</div>
          </div>
          <div className="p-4 rounded-xl bg-green-50/50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
            <Users className="w-5 h-5 text-secondary dark:text-green-400 mb-2" />
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">48</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">New Patients/Mo</div>
          </div>
        </div>

        {/* Charts Mockup */}
        <div className="space-y-4">
          <div className="h-32 bg-slate-50 dark:bg-slate-900/50 rounded-xl relative overflow-hidden flex items-end justify-between p-4 px-6">
             <div className="w-6 h-12 bg-blue-200 dark:bg-blue-800 rounded-t"></div>
             <div className="w-6 h-16 bg-blue-300 dark:bg-blue-700 rounded-t"></div>
             <div className="w-6 h-20 bg-blue-400 dark:bg-blue-600 rounded-t"></div>
             <div className="w-6 h-24 bg-primary dark:bg-blue-500 rounded-t"></div>
             <div className="w-6 h-14 bg-blue-200 dark:bg-blue-800 rounded-t"></div>
             <div className="w-6 h-28 bg-primary dark:bg-blue-500 rounded-t"></div>
          </div>
          <div className="h-32 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
            <div className="flex justify-between mb-2">
               <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
               <div className="w-10 h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
            <div className="space-y-2">
               {[1,2,3].map(i => (
                 <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded"></div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -right-6 md:-right-12 bg-white dark:bg-slate-700 rounded-xl shadow-xl border border-slate-100 dark:border-slate-600 p-4 flex items-center gap-4 z-10"
        >
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Calendar className="text-secondary dark:text-green-400 w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-100">New Booking!</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Dental Checkup (10:30 AM)</div>
          </div>
          <Check className="text-secondary dark:text-green-400 w-4 h-4 ml-2" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 -left-8 md:-left-16 bg-white dark:bg-slate-700 rounded-xl shadow-xl border border-slate-100 dark:border-slate-600 p-4 flex items-center gap-4 z-10"
        >
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-100">5-Star Review</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">"Excellent care, booked via text!"</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
