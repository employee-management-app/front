import { ReactComponent as LowPriorityIcon } from '../assets/icons/priorities/low.svg';
import { ReactComponent as NormalPriorityIcon } from '../assets/icons/priorities/normal.svg';
import { ReactComponent as HighPriorityIcon } from '../assets/icons/priorities/high.svg';
import { ReactComponent as VeryHighPriorityIcon } from '../assets/icons/priorities/very-high.svg';

const icons = [
  LowPriorityIcon,
  NormalPriorityIcon,
  HighPriorityIcon,
  VeryHighPriorityIcon,
];

const labels = [
  'Low',
  'Normal',
  'High',
  'Very high',
];

export const useOrderPriority = (priority) => {
  const getIcon = (key = priority) => icons[key];

  return {
    priorities: labels.map((label, key) => ({ label, icon: getIcon(key) })),
    icon: icons[priority],
    label: labels[priority],
    getIcon,
  };
};
