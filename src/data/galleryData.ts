// galleryData.ts
export const galleryImagess = [
  // 1. Pertemuan/diskusi kelompok masyarakat
  "https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg",
  
  // 2. Gotong royong / kerja bakti
  "https://cdn.pixabay.com/photo/2015/07/02/10/22/training-828726_1280.jpg",
  
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
