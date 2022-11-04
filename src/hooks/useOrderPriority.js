import { ReactComponent as LowPriorityIcon } from '../assets/icons/priorities/low.svg';
import { ReactComponent as NormalPriorityIcon } from '../assets/icons/priorities/normal.svg';
import { ReactComponent as HighPriorityIcon } from '../assets/icons/priorities/high.svg';
import { ReactComponent as CriticalIcon } from '../assets/icons/priorities/critical.svg';

const icons = [
  LowPriorityIcon,
  NormalPriorityIcon,
  HighPriorityIcon,
  CriticalIcon,
];

const labels = [
  'Low',
  'Normal',
  'High',
  'Critical',
];

export const useOrderPriority = (priority) => ({
  priorities: [...labels].reverse().map((label, index) => ({
    label,
    icon: icons[icons.length - index - 1],
    value: icons.length - index - 1,
  })),
  icon: icons[priority],
  label: labels[priority],
});
