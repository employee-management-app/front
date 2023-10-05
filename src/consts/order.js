import { ReactComponent as LowPriorityIcon } from '../assets/icons/priorities/low.svg';
import { ReactComponent as NormalPriorityIcon } from '../assets/icons/priorities/normal.svg';
import { ReactComponent as HighPriorityIcon } from '../assets/icons/priorities/high.svg';
import { ReactComponent as CriticalIcon } from '../assets/icons/priorities/critical.svg';

const DEFAULT_PRODUCT_TYPE_OPTIONS = [
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

const REAL_ESTATE_PRODUCT_TYPE_OPTIONS = [
  {
    label: 'Serwis drzwi/bramy',
    value: 'Serwis drzwi/bramy',
  },
  {
    label: 'Prace porządkowe (sprzątanie)',
    value: 'Prace porządkowe',
  },
  {
    label: 'Utrzymanie chodników i dróg (odśnieżanie/solenie)',
    value: 'Utrzymanie chodników i dróg',
  },
  {
    label: 'Pielęgnacja zieleni',
    value: 'Pielęgnacja zieleni',
  },
];

export const getProductTypeOptions = (companyId) => {
  if (companyId === '651ebd32365d2688cb5e63cd') {
    return REAL_ESTATE_PRODUCT_TYPE_OPTIONS;
  }

  return DEFAULT_PRODUCT_TYPE_OPTIONS;
};

const DEFAULT_STAGE_OPTIONS = [
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

const REAL_ESTATE_STAGE_OPTIONS = [
  {
    label: 'Serwis',
    value: 'Serwis',
  },
];

export const getStageOptions = (companyId) => {
  if (companyId === '651ebd32365d2688cb5e63cd') {
    return REAL_ESTATE_STAGE_OPTIONS;
  }

  return DEFAULT_STAGE_OPTIONS;
};

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
