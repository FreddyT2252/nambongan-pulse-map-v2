// galleryData.ts
export const galleryImagess = [
  // 1. Pertemuan/diskusi kelompok masyarakat
  "https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg",
  
  // 2. Gotong royong / kerja bakti
  "https://id.images.search.yahoo.com/images/view;_ylt=AwrKDm8yDHppA.k2alfNQwx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkA2QxMGM2MTA5NjMxZDVjZTJiMGUxNWYzMmZhMWNmN2I0BGdwb3MDMTMEaXQDYmluZw--?back=https%3A%2F%2Fid.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dlogo%2Bugm%26type%3DE211ID885G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D13&w=1175&h=436&imgurl=1.bp.blogspot.com%2F-SWJ8QksGDyE%2FVyk3yOP6j1I%2FAAAAAAAAALM%2FvwGfGi7K-pQ3Qvauq_8c4meDTNSZgDD9wCLcB%2Fs1600%2FDaftar%252BLengkap%252BJurusan%252BUGM%252BUniversitas%252BGajah%252BMada%252BTerbaru.jpg&rurl=https%3A%2F%2Fwww.daftarjurusan.id%2F2016%2F05%2Fdaftar-lengkap-jurusan-ugm-universitas-gajah-mada-terbaru.html&size=228KB&p=logo+ugm&oid=d10c6109631d5ce2b0e15f32fa1cf7b4&fr2=piv-web&fr=mcafee&tt=Daftar+Lengkap+Jurusan+UGM+Universitas+Gajah+Mada+Terbaru+-+Daftar+Jurusan&b=0&ni=21&no=13&ts=&tab=organic&sigr=mkr8hUoXdhvW&sigb=gtRY44yPxWCH&sigi=zKODRQ.ErodT&sigt=3lNLMRGQYp2X&.crumb=/XFGjYTZRtl&fr=mcafee&fr2=piv-web&type=E211ID885G0",
  
  // 3. Kegiatan volunteer / relawan
  "https://cdn.pixabay.com/photo/2017/02/18/20/10/volunteer-2078135_1280.jpg",
  
  // 4. Meeting / pertemuan formal
  "https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg",
  
  // 5. Kerja sama tim masyarakat
  "https://cdn.pixabay.com/photo/2016/11/29/03/53/teamwork-1867499_1280.jpg",
  
  // 6. Kegiatan komunitas outdoor
  "https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg",
  
  // 7. Diskusi kelompok warga
  "https://cdn.pixabay.com/photo/2015/05/26/23/52/question-mark-788492_1280.jpg",
  
  // 8. Pembangunan/infrastruktur komunitas
  "https://cdn.pixabay.com/photo/2017/08/02/01/01/people-2569234_1280.jpg",
  
  // 9. Kegiatan sosial / charity
  "https://cdn.pixabay.com/photo/2018/03/19/18/20/tea-light-3240602_1280.jpg",
  
  // 10. Komunitas bergotong royong
  "https://cdn.pixabay.com/photo/2016/03/09/15/10/man-1246508_1280.jpg",
  
];


export const galleryImages = [

];

// Helper function untuk mengambil gambar secara acak
export const getRandomGalleryImages = (count: number) => {
  const shuffled = [...galleryImages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
