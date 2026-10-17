import React from 'react';

export const DashboardCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  badgeType = 'success',
  trend,
}) => {
  const badgeColors = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    info: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/60',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {value}
          </h3>
        </div>

        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
            <Icon size={22} />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        {subtitle && (
          <span className="text-slate-500 font-medium">
            {subtitle}
          </span>
        )}

        {badge && (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full font-bold text-[11px] border ${
              badgeColors[badgeType] || badgeColors.info
            }`}
          >
            {badge}
          </span>
        )}

        {trend && (
          <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};
