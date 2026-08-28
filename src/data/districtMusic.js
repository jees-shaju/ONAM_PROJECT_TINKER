export const DISTRICT_MUSIC = {
  Thrissur: '/audio/thrissur.mp3',
  Thiruvananthapuram: '/audio/thiruvananthapuram.mp3',
  Alappuzha: '/audio/alappuzha.mp3',
  Ernakulam: '/audio/ernakulam.mp3',
  Pathanamthitta: '/audio/pathanamthitta.mp3',
  Kottayam: '/audio/kottayam.mp3',
  Kollam: '/audio/kollam.mp3',
  Idukki: '/audio/idukki.mp3',
  Palakkad: '/audio/palakkad.mp3',
  Malappuram: '/audio/malappuram.mp3',
  Kozhikode: '/audio/kozhikode.mp3',
  Wayanad: '/audio/wayanad.mp3',
  Kannur: '/audio/kannur.mp3',
  Kasaragod: '/audio/kasaragod.mp3',
};

export function getDistrictMusic(district) {
  return DISTRICT_MUSIC[district] || null;
}