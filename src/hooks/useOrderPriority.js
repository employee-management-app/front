import { ReactComponent as LowPriorityIcon } from '../assets/icons/priorities/low.svg';
import { ReactComponent as NormalPriorityIcon } from '../assets/icons/priorities/normal.svg';
import { ReactComponent as HighPriorityIcon } from '../assets/icons/priorities/high.svg';
import { ReactComponent as CriticalIcon } from '../assets/icons/priorities/critical.svg';
import { PRIORITY_OPTIONS } from '../consts/order';

const icons = [
  LowPriorityIcon,
  NormalPriorityIcon,
  HighPriorityIcon,
  CriticalIcon,
];

const labels = PRIORITY_OPTIONS.map((option) => option.label);

export const useOrderPriority = (priority) => ({
  priorities: [...labels].reverse().map((label, index) => ({
    label,
    icon: icons[icons.length - index - 1],
    value: icons.length - index - 1,
  })),
  icon: icons[priority],
  label: labels[priority],
});
