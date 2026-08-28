const DISTRICT_ORDER = [
  'Thrissur',
  'Thiruvananthapuram',
  'Alappuzha',
  'Ernakulam',
  'Pathanamthitta',
  'Kottayam',
  'Kollam',
  'Idukki',
  'Palakkad',
  'Malappuram',
  'Kozhikode',
  'Wayanad',
  'Kannur',
  'Kasaragod',
];

export const SCENARIO_IMAGES = Object.fromEntries(
  DISTRICT_ORDER.map((district, districtIndex) => {
    const firstPage = districtIndex * 3 + 1;
    const pages = [0, 1, 2].map(offset => `/scenarios/page-${String(firstPage + offset).padStart(2, '0')}.png`);
    return [district, { hero: pages[0], tasks: pages }];
  }),
);

export function getScenarioImages(district) {
  return SCENARIO_IMAGES[district] || { hero: null, tasks: [] };
}