import { ReactComponent as LowPriorityIcon } from '../assets/icons/priorities/low.svg';
import { ReactComponent as NormalPriorityIcon } from '../assets/icons/priorities/normal.svg';
import { ReactComponent as VeryHighPriorityIcon } from '../assets/icons/priorities/very-high.svg';
import { ReactComponent as CriticalIcon } from '../assets/icons/priorities/critical.svg';

const icons = [
  LowPriorityIcon,
  NormalPriorityIcon,
  VeryHighPriorityIcon,
  CriticalIcon,
];

const labels = [
  'Low',
  'Normal',
  'High',
  'Critical',
];

const colors = [
  '#16CB77',
  '#212121',
  '#FF9900',
  '#FF0000',
];

export const useOrderPriority = (priority) => ({
  priorities: [...labels].reverse().map((label, index) => ({
    label,
    icon: icons[icons.length - index - 1],
    value: icons.length - index - 1,
  })),
  colors,
  icon: icons[priority],
  label: labels[priority],
});
