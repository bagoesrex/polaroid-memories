import type { GiftConfig, Memory } from '../types';

export const DEFAULT_CONFIG: GiftConfig = {
        recipient: 'Tole',
        sender: 'Kucink',
        stickyNote: '4 momen favorit kita 😻',
        letterDate: 'NOVEMBER 2026',
        letterBody:
          'Selamat ulang tahun ya.\n\nEmpat foto di kamera ini cuma sebagian kecil dari banyak hal sederhana yang selalu bikin aku bersyukur bisa kenal kamu. Terima kasih sudah selalu hadir, dengerin cerita receh, dan bikin hari-hari biasa jadi terasa hangat.\n\nSemoga tahun ini penuh hal baik yang lembut untukmu.'
      };

export const MEMORIES: Memory[] = [
        {
          id: 1,
          image: 'images/tole.webp',
          caption: 'kopi sore & cheesecake terakhir',
          date: '14 MAR 2026',
          backNote: 'Inget gak sore ini kita cuma niat mampir 30 menit, eh malah ngobrol sampai kafe hampir tutup karena lupa waktu?',
          tilt: -4.2
        },
        {
          id: 2,
          image: 'images/tole.webp',
          caption: 'langit jingga sebelum pulang',
          date: '02 JUN 2026',
          backNote: 'Salah satu senja paling tenang tahun ini. Sepatu penuh pasir, angin kencang, tapi rasanya pengin momennya berhenti sebentar.',
          tilt: 3.1
        },
        {
          id: 3,
          image: 'images/tole.webp',
          caption: 'hujan deras di jalan pulang',
          date: '19 SEP 2026',
          backNote: 'Macet total waktu hujan deras, playlist muter lagu lama terus, dan entah kenapa malah jadi perjalanan favoritku.',
          tilt: -2.4
        },
        {
          id: 4,
          image: 'images/tole.webp',
          caption: 'harapan kecil di malam itu',
          date: '23 NOV 2026',
          backNote: 'Semoga semua hal baik yang kamu semogakan diam-diam pelan-pelan ketemu jalannya satu per satu ya.',
          tilt: 4.0
        }
      ];
