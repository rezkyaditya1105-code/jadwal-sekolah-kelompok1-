/**
 * JADWAL SEKOLAH & MANAJEMEN RUANG / LAB (1.1.1 - 3.3.12)
 * Author: Rezky Aditya - Kelompok 1
 */

// Data Referensi
const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

const TIME_SLOTS = [
  { id: 's1', label: 'Sesi 1', time: '07:00 - 07:45', isBreak: false },
  { id: 's2', label: 'Sesi 2', time: '07:45 - 08:30', isBreak: false },
  { id: 's3', label: 'Sesi 3', time: '08:30 - 09:15', isBreak: false },
  { id: 's4', label: 'Sesi 4', time: '09:15 - 10:00', isBreak: false },
  { id: 'b1', label: 'Istirahat 1', time: '10:00 - 10:20', isBreak: true },
  { id: 's5', label: 'Sesi 5', time: '10:20 - 11:05', isBreak: false },
  { id: 's6', label: 'Sesi 6', time: '11:05 - 11:50', isBreak: false },
  { id: 'b2', label: 'Ishoma', time: '11:50 - 12:45', isBreak: true },
  { id: 's7', label: 'Sesi 7', time: '12:45 - 13:30', isBreak: false },
  { id: 's8', label: 'Sesi 8', time: '13:30 - 14:15', isBreak: false },
  { id: 's9', label: 'Sesi 9', time: '14:15 - 15:00', isBreak: false },
];

const TEACHERS = [
  'Drs. Ahmad Fauzi, M.Pd',
  'Siti Nurhaliza, S.Kom, M.T',
  'Budi Santoso, S.T, M.Cs',
  'Dewi Sartika, S.Pd',
  'Eko Prasetyo, S.Kom',
  'Fitri Handayani, S.Pd',
  'Hendra Gunawan, M.Kom',
  'Irma Suryani, S.Pd',
  'Joko Susilo, M.T',
  'Ratna Sari, S.Kom'
];

const SUBJECTS = [
  'Pemrograman Web & Mobile',
  'Basis Data & Cloud DB',
  'Administrasi Infrastruktur Jaringan',
  'Keamanan Jaringan & Cyber Security',
  'Desain Grafis & UI/UX',
  'Internet of Things (IoT)',
  'Pemrograman Berorientasi Objek',
  'Kecerdasan Buatan (AI Basics)',
  'Animasi 2D & 3D',
  'Teknologi Layanan Jaringan'
];

const CLASSES = [
  'XII RPL 1', 'XII RPL 2', 'XII TKJ 1', 'XII TKJ 2', 'XII DKV 1',
  'XI RPL 1', 'XI RPL 2', 'XI TKJ 1', 'XI TKJ 2', 'XI DKV 1',
  'X PPLG 1', 'X PPLG 2', 'X TJKT 1', 'X TJKT 2', 'X DKV 1'
];

// Generate 108 Ruangan dari 1.1.1 sampai 3.3.12
const ROOMS = [];
for (let g = 1; g <= 3; g++) {
  for (let f = 1; f <= 3; f++) {
    for (let r = 1; r <= 12; r++) {
      const roomId = `${g}.${f}.${r}`;
      let roomType = 'Lab Komputer';
      if (g === 1) {
        roomType = r <= 6 ? 'Lab Software / RPL' : 'Lab Jaringan / TKJ';
      } else if (g === 2) {
        roomType = r <= 6 ? 'Lab Multimedia / DKV' : 'Lab Elektronika & IoT';
      } else {
        roomType = r <= 6 ? 'Ruang Teori Interaktif' : 'Lab Riset & Proyek';
      }

      ROOMS.push({
        id: roomId,
        gedung: g,
        lantai: f,
        noRuang: r,
        name: `Ruang ${roomId}`,
        type: roomType,
        kapasitas: 36
      });
    }
  }
}

// Generate Schedule Dataset
// schedules[day][roomId][slotId] = { status, teacher, subject, classGroup, purpose }
const schedules = {};

function initSchedules() {
  DAYS.forEach((day, dayIndex) => {
    schedules[day] = {};

    ROOMS.forEach((room, roomIdx) => {
      schedules[day][room.id] = {};

      TIME_SLOTS.forEach((slot, slotIdx) => {
        if (slot.isBreak) return;

        // Pseudo-random deterministic distribution based on indices
        const seed = (dayIndex * 13 + roomIdx * 7 + slotIdx * 11) % 100;

        if (seed < 48) {
          // Status: Ditempati (Guru mengajar, murid belajar)
          const teacher = TEACHERS[(roomIdx + slotIdx) % TEACHERS.length];
          const subject = SUBJECTS[(roomIdx + dayIndex) % SUBJECTS.length];
          const classGroup = CLASSES[(roomIdx * 2 + slotIdx) % CLASSES.length];

          schedules[day][room.id][slot.id] = {
            status: 'ditempati',
            teacher: teacher,
            subject: subject,
            classGroup: classGroup,
            purpose: 'KBM / Praktikum Terjadwal'
          };
        } else if (seed < 72) {
          // Status: Dibooking (Persiapan Ujian / Ekskul / Bimbingan Lomba)
          const teacher = TEACHERS[(roomIdx + dayIndex + 2) % TEACHERS.length];
          const classGroup = CLASSES[(roomIdx + 3) % CLASSES.length];
          const bookingReasons = [
            'Sesi Persiapan Uji Kompetensi Keahlian (UKK)',
            'Ekskul Coding Club & Robotika',
            'Bimbingan LKS Tingkat Provinsi',
            'Pelatihan Sertifikasi Mikrotik / Cisco',
            'Workshop UI/UX Design Figma'
          ];
          const purpose = bookingReasons[(roomIdx + slotIdx) % bookingReasons.length];

          schedules[day][room.id][slot.id] = {
            status: 'dibooking',
            teacher: teacher,
            subject: 'Kegiatan Terjadwal / Khusus',
            classGroup: classGroup,
            purpose: purpose
          };
        } else {
          // Status: Kosong (Available)
          schedules[day][room.id][slot.id] = {
            status: 'kosong',
            teacher: '-',
            subject: '-',
            classGroup: '-',
            purpose: 'Ruangan Siap Digunakan'
          };
        }
      });
    });
  });
}

// App State
let currentDay = 'Senin';
let currentGedung = 'all';
let currentLantai = 'all';
let currentStatus = 'all';
let searchQuery = '';
let currentPage = 1;
const itemsPerPage = 12; // Menampilkan 12 ruangan per page agar tidak lag, dengan tombol page

// DOM Elements
const scheduleBody = document.getElementById('scheduleTableBody');
const scheduleHeader = document.getElementById('scheduleTableHeader');
const dayTabsContainer = document.getElementById('dayTabs');
const filterGedung = document.getElementById('filterGedung');
const filterLantai = document.getElementById('filterLantai');
const filterStatus = document.getElementById('filterStatus');
const searchInput = document.getElementById('searchQuery');
const clockDisplay = document.getElementById('liveClock');
const themeToggle = document.getElementById('themeToggle');
const themeToggleLabel = document.getElementById('themeToggleLabel');

// Counter Elements
const countTotal = document.getElementById('countTotal');
const countDitempati = document.getElementById('countDitempati');
const countDibooking = document.getElementById('countDibooking');
const countKosong = document.getElementById('countKosong');

// Pagination Elements
const pageInfo = document.getElementById('pageInfo');
const btnPrevPage = document.getElementById('btnPrevPage');
const btnNextPage = document.getElementById('btnNextPage');
const showingRange = document.getElementById('showingRange');

// Modal Elements
const modalOverlay = document.getElementById('modalOverlay');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalRoomTitle = document.getElementById('modalRoomTitle');
const modalDayTime = document.getElementById('modalDayTime');
const modalStatus = document.getElementById('modalStatus');
const modalSubject = document.getElementById('modalSubject');
const modalTeacher = document.getElementById('modalTeacher');
const modalClass = document.getElementById('modalClass');
const modalPurpose = document.getElementById('modalPurpose');
const btnToggleBooking = document.getElementById('btnToggleBooking');

let activeModalTarget = null;

// Memasang tema tersimpan dan memperbarui label tombol agar menunjukkan pilihan berikutnya.
function initThemeToggle() {
  const savedTheme = localStorage.getItem('schoolScheduleTheme');
  const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = initialTheme;

  function updateThemeToggle(theme) {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const nextThemeLabel = nextTheme === 'dark' ? 'Mode Gelap' : 'Mode Terang';
    const nextThemeIcon = nextTheme === 'dark' ? '☾' : '☀';

    themeToggleLabel.textContent = nextThemeLabel;
    themeToggle.querySelector('.theme-toggle-icon').textContent = nextThemeIcon;
    themeToggle.setAttribute('aria-label', `Aktifkan ${nextThemeLabel.toLowerCase()}`);
  }

  updateThemeToggle(initialTheme);

  // Mengganti tema halaman dan menyimpan pilihan supaya tetap aktif saat dibuka kembali.
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('schoolScheduleTheme', nextTheme);
    updateThemeToggle(nextTheme);
  });
}

// Initialize Live Clock
function startClock() {
  function updateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    if (clockDisplay) {
      clockDisplay.textContent = now.toLocaleDateString('id-ID', options);
    }
  }
  updateTime();
  setInterval(updateTime, 1000);
}

// Render Header Columns
function renderTableHeader() {
  let headerHtml = `
    <tr>
      <th class="col-room-header">
        <div>Ruang / Lab</div>
        <span class="time-sub">Gedung 1 - 3 (1.1.1 - 3.3.12)</span>
      </th>
  `;

  TIME_SLOTS.forEach(slot => {
    if (slot.isBreak) {
      headerHtml += `
        <th class="col-break">
          <div>${slot.label}</div>
          <span class="time-sub">${slot.time}</span>
        </th>
      `;
    } else {
      headerHtml += `
        <th>
          <div>${slot.label}</div>
          <span class="time-sub">${slot.time}</span>
        </th>
      `;
    }
  });

  headerHtml += '</tr>';
  scheduleHeader.innerHTML = headerHtml;
}

// Render Day Tabs
function renderDayTabs() {
  dayTabsContainer.innerHTML = '';
  DAYS.forEach(day => {
    const btn = document.createElement('button');
    btn.className = `day-tab ${day === currentDay ? 'active' : ''}`;
    btn.textContent = day;
    btn.addEventListener('click', () => {
      currentDay = day;
      document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      currentPage = 1;
      renderTable();
    });
    dayTabsContainer.appendChild(btn);
  });
}

// Filter Rooms
function getFilteredRooms() {
  return ROOMS.filter(room => {
    // Filter Gedung
    if (currentGedung !== 'all' && room.gedung !== parseInt(currentGedung)) {
      return false;
    }

    // Filter Lantai
    if (currentLantai !== 'all' && room.lantai !== parseInt(currentLantai)) {
      return false;
    }

    // Filter Search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchRoom = room.id.toLowerCase().includes(q) || room.name.toLowerCase().includes(q) || room.type.toLowerCase().includes(q);
      
      // Also check if any teacher or class or subject matches in this room today
      const roomDaySlots = schedules[currentDay][room.id];
      const matchSchedule = Object.values(roomDaySlots).some(slot => 
        (slot.teacher && slot.teacher.toLowerCase().includes(q)) ||
        (slot.subject && slot.subject.toLowerCase().includes(q)) ||
        (slot.classGroup && slot.classGroup.toLowerCase().includes(q)) ||
        (slot.status && slot.status.toLowerCase().includes(q))
      );

      if (!matchRoom && !matchSchedule) {
        return false;
      }
    }

    // Filter Status: cek apakah ruangan ini memiliki slot dengan status tersebut pada hari aktif
    if (currentStatus !== 'all') {
      const roomDaySlots = schedules[currentDay][room.id];
      const hasStatus = Object.values(roomDaySlots).some(slot => slot.status === currentStatus);
      if (!hasStatus) {
        return false;
      }
    }

    return true;
  });
}

// Update Summary Stats
function updateStats(filteredRooms) {
  let totalSlots = 0;
  let occupiedCount = 0;
  let bookedCount = 0;
  let emptyCount = 0;

  filteredRooms.forEach(room => {
    const roomSlots = schedules[currentDay][room.id];
    Object.values(roomSlots).forEach(slot => {
      totalSlots++;
      if (slot.status === 'ditempati') occupiedCount++;
      else if (slot.status === 'dibooking') bookedCount++;
      else if (slot.status === 'kosong') emptyCount++;
    });
  });

  countTotal.textContent = filteredRooms.length + ' Ruang';
  countDitempati.textContent = occupiedCount + ' Sesi';
  countDibooking.textContent = bookedCount + ' Sesi';
  countKosong.textContent = emptyCount + ' Sesi';
}

// Render Table Body
function renderTable() {
  const filteredRooms = getFilteredRooms();
  updateStats(filteredRooms);

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredRooms.length);
  const paginatedRooms = filteredRooms.slice(startIndex, endIndex);

  // Update Pagination Controls
  pageInfo.textContent = `Halaman ${currentPage} dari ${totalPages}`;
  showingRange.textContent = filteredRooms.length > 0 
    ? `Menampilkan ${startIndex + 1} - ${endIndex} dari ${filteredRooms.length} ruangan (Ruang 1.1.1 - 3.3.12)`
    : 'Tidak ada ruangan yang cocok dengan filter';
  btnPrevPage.disabled = currentPage === 1;
  btnNextPage.disabled = currentPage === totalPages || totalPages === 0;

  if (paginatedRooms.length === 0) {
    scheduleBody.innerHTML = `
      <tr>
        <td colspan="${TIME_SLOTS.length + 1}" style="text-align: center; padding: 48px; color: #64748b;">
          <div style="font-size: 16px; font-weight: 600; margin-bottom: 6px;">Data Ruangan Tidak Ditemukan</div>
          <div style="font-size: 13px;">Coba ubah kata kunci pencarian atau sesuaikan filter gedung, lantai, dan status.</div>
        </td>
      </tr>
    `;
    return;
  }

  let bodyHtml = '';

  paginatedRooms.forEach(room => {
    bodyHtml += `<tr>`;

    // Sticky Room Header Cell
    bodyHtml += `
      <td class="col-room">
        <div class="room-badge-container">
          <span class="room-id">Ruang ${room.id}</span>
          <span class="room-tag">G${room.gedung}.L${room.lantai}</span>
        </div>
        <div class="room-details">${room.type} • Kap. ${room.kapasitas}</div>
      </td>
    `;

    // Slot Cells
    TIME_SLOTS.forEach(slot => {
      if (slot.isBreak) {
        bodyHtml += `
          <td class="cell-break">
            <span>${slot.label}</span>
          </td>
        `;
      } else {
        const slotData = schedules[currentDay][room.id][slot.id] || { status: 'kosong' };
        
        let cardContent = '';
        if (slotData.status === 'ditempati') {
          cardContent = `
            <div class="schedule-card status-ditempati" onclick="openModal('${room.id}', '${slot.id}')">
              <div class="card-top">
                <span class="status-badge ditempati">Ditempati</span>
                <span style="font-size: 10px; color: #991b1b; font-weight: 600;">KBM Aktif</span>
              </div>
              <div class="card-subject" title="${slotData.subject}">${slotData.subject}</div>
              <div class="card-meta-row">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span title="${slotData.teacher}">${slotData.teacher}</span>
              </div>
              <div class="card-meta-row">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <strong>${slotData.classGroup}</strong>
              </div>
            </div>
          `;
        } else if (slotData.status === 'dibooking') {
          cardContent = `
            <div class="schedule-card status-dibooking" onclick="openModal('${room.id}', '${slot.id}')">
              <div class="card-top">
                <span class="status-badge dibooking">Dibooking</span>
                <span style="font-size: 10px; color: #b45309; font-weight: 600;">Reserved</span>
              </div>
              <div class="card-subject" title="${slotData.purpose}">${slotData.purpose}</div>
              <div class="card-meta-row">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span title="${slotData.teacher}">PJ: ${slotData.teacher}</span>
              </div>
              <div class="card-meta-row">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>${slotData.classGroup}</span>
              </div>
            </div>
          `;
        } else {
          cardContent = `
            <div class="schedule-card status-kosong" onclick="openModal('${room.id}', '${slot.id}')">
              <div class="empty-room-prompt">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                <span>Ruang Kosong</span>
                <span style="font-size: 10px; opacity: 0.75;">Klik untuk booking</span>
              </div>
            </div>
          `;
        }

        bodyHtml += `<td class="cell-slot">${cardContent}</td>`;
      }
    });

    bodyHtml += `</tr>`;
  });

  scheduleBody.innerHTML = bodyHtml;
}

// Modal Functions
window.openModal = function(roomId, slotId) {
  const room = ROOMS.find(r => r.id === roomId);
  const slot = TIME_SLOTS.find(s => s.id === slotId);
  const data = schedules[currentDay][roomId][slotId];

  if (!room || !slot || !data) return;

  activeModalTarget = { roomId, slotId, day: currentDay };

  modalRoomTitle.textContent = `Ruang ${room.id} (${room.type})`;
  modalDayTime.textContent = `${currentDay}, ${slot.label} (${slot.time})`;

  let statusBadgeHtml = '';
  if (data.status === 'ditempati') {
    statusBadgeHtml = '<span class="status-badge ditempati">🔴 Sedang Ditempati (KBM)</span>';
    btnToggleBooking.textContent = 'Kosongkan Ruangan';
    btnToggleBooking.className = 'btn-secondary';
  } else if (data.status === 'dibooking') {
    statusBadgeHtml = '<span class="status-badge dibooking">🟡 Sudah Dibooking</span>';
    btnToggleBooking.textContent = 'Batalkan Booking';
    btnToggleBooking.className = 'btn-secondary';
  } else {
    statusBadgeHtml = '<span class="status-badge kosong">🟢 Ruang Kosong (Tersedia)</span>';
    btnToggleBooking.textContent = '+ Booking Ruangan Ini';
    btnToggleBooking.className = 'btn-primary';
  }

  modalStatus.innerHTML = statusBadgeHtml;
  modalSubject.textContent = data.subject || '-';
  modalTeacher.textContent = data.teacher || '-';
  modalClass.textContent = data.classGroup || '-';
  modalPurpose.textContent = data.purpose || '-';

  modalOverlay.classList.add('open');
};

function closeModal() {
  modalOverlay.classList.remove('open');
  activeModalTarget = null;
}

// Toggle or Booking Action
if (btnToggleBooking) {
  btnToggleBooking.addEventListener('click', () => {
    if (!activeModalTarget) return;
    const { roomId, slotId, day } = activeModalTarget;
    const currentSlot = schedules[day][roomId][slotId];

    if (currentSlot.status === 'kosong') {
      // Ubah jadi dibooking
      currentSlot.status = 'dibooking';
      currentSlot.teacher = 'Pengguna Saat Ini (Rezky Aditya)';
      currentSlot.classGroup = 'Kelompok 1 (KIK)';
      currentSlot.purpose = 'Kegiatan Praktikum Tambahan Mandiri';
      currentSlot.subject = 'Praktikum Mandiri';
    } else {
      // Kosongkan kembali
      currentSlot.status = 'kosong';
      currentSlot.teacher = '-';
      currentSlot.classGroup = '-';
      currentSlot.purpose = 'Ruangan Siap Digunakan';
      currentSlot.subject = '-';
    }

    renderTable();
    closeModal();
  });
}

// Event Listeners for Filters
filterGedung.addEventListener('change', (e) => {
  currentGedung = e.target.value;
  currentPage = 1;
  renderTable();
});

filterLantai.addEventListener('change', (e) => {
  currentLantai = e.target.value;
  currentPage = 1;
  renderTable();
});

filterStatus.addEventListener('change', (e) => {
  currentStatus = e.target.value;
  currentPage = 1;
  renderTable();
});

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  currentPage = 1;
  renderTable();
});

btnPrevPage.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
});

btnNextPage.addEventListener('click', () => {
  currentPage++;
  renderTable();
});

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  startClock();
  initSchedules();
  renderTableHeader();
  renderDayTabs();
  renderTable();
});
