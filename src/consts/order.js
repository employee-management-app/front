import { ReactComponent as LowPriorityIcon } from '../assets/icons/priorities/low.svg';
import { ReactComponent as NormalPriorityIcon } from '../assets/icons/priorities/normal.svg';
import { ReactComponent as HighPriorityIcon } from '../assets/icons/priorities/high.svg';
import { ReactComponent as CriticalIcon } from '../assets/icons/priorities/critical.svg';

export const PRODUCT_TYPE_OPTIONS = [
  {
    label: 'Osłony wewnętrzne (rolety, żaluzje, plisy)',
    value: 'Osłony wewnętrzne',
  },
  {
    label: 'Osłony zewnętrzne (rolety, żaluzje, screeny, moskitiery)',
    value: 'Osłony zewnętrzne',
  },
  {
    label: 'Ogród (pergole, markizy)',
    value: 'Ogród',
  },
  {
    label: 'Inne (proszę opisać w polu Description)',
    value: 'Inne',
  },
];

export const STAGE_OPTIONS = [
  {
    label: 'Pomiar',
    value: 'Pomiar',
  },
  {
    label: 'Montaż',
    value: 'Montaż',
  },
  {
    label: 'Reklamacja',
    value: 'Reklamacja',
  },
  {
    label: 'Serwis',
    value: 'Serwis',
  },
];

export const PRIORITY_OPTIONS = [
  {
    label: 'Critical',
    icon: CriticalIcon,
    value: '3',
  },
  {
    label: 'High',
    icon: HighPriorityIcon,
    value: '2',
  },
  {
    label: 'Normal',
    icon: NormalPriorityIcon,
    value: '1',
  },
  {
    label: 'Low',
    icon: LowPriorityIcon,
    value: '0',
  },
];
