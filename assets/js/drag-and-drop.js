/**
 * ============================================================================
 * NUTRIGENIUS DRAG AND DROP (drag-and-drop.js)
 * Modul 12: Meal Planner - Isi Piringku.
 * Menangani interaksi Drag & Drop, kalkulasi gizi real-time, 
 * serta manajemen status nampan makanan.
 * ============================================================================
 */
document.addEventListener('DOMContentLoaded', function() {
    
    const dropzones = document.querySelectorAll('.dropzone');
    const foodItems = document.querySelectorAll('.food-item');
    if (dropzones.length === 0 || foodItems.length === 0) return;

    const totalCaloriesDisplay = document.getElementById('total-calories-display');
    const valKarbo = document.getElementById('val-karbo');
    const valProtein = document.getElementById('val-protein');
    const valLemak = document.getElementById('val-lemak');
    const emptyMessage = document.getElementById('empty-tray-message');
    
    const contextMenu = document.getElementById('custom-context-menu');
    const btnBatalMenu = document.getElementById('btn-batal-menu');
    const btnHapusMenu = document.getElementById('btn-hapus-makanan');
    const deleteModal = document.getElementById('delete-confirm-modal');
    const deleteCard = document.getElementById('delete-card');
    const btnCancelDelete = document.getElementById('btn-cancel-delete');
    const btnConfirmDelete = document.getElementById('btn-confirm-delete');

    let trayState = {
        'zone-1': null,
        'zone-2': null,
        'zone-3': null,
        'zone-4': null,
        'zone-5': null
    };

    let bentoChartInstance = null;
    let activeZoneForDelete = null; 

    function initBentoChart() {
        const canvas = document.getElementById('bentoPieChart');
        if(!canvas) return;

        bentoChartInstance = new Chart(canvas.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Karbohidrat', 'Protein', 'Lemak'],
                datasets: [{
                    data: [0, 0, 0], 
                    backgroundColor: ['#f97316', '#fb923c', '#fdba74'], 
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) { return ` ${context.label}: ${context.raw}g`; }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    duration: 800,
                    easing: 'easeOutBounce'
                }
            }
        });
    }
    
    initBentoChart();

    window.addEventListener('resize', () => {
        if (bentoChartInstance) bentoChartInstance.resize();
    });

    function updateTrayStatistics() {
        let totalKalori = 0;
        let totalKarbo = 0;
        let totalProtein = 0;
        let totalLemak = 0;
        let isTrayEmpty = true;

        for (const zoneId in trayState) {
            const food = trayState[zoneId];
            if (food) {
                isTrayEmpty = false;
                totalKalori += parseFloat(food.kalori);
                totalKarbo += parseFloat(food.karbo);
                totalProtein += parseFloat(food.protein);
                totalLemak += parseFloat(food.lemak);
            }
        }

        totalCaloriesDisplay.innerHTML = `${totalKalori} <span class="text-sm text-gray-500 font-medium">Kkal</span>`;
        valKarbo.innerText = `${totalKarbo}g`;
        valProtein.innerText = `${totalProtein}g`;
        valLemak.innerText = `${totalLemak}g`;

        if (isTrayEmpty) {
            emptyMessage.classList.remove('hidden');
            if (bentoChartInstance) {
                bentoChartInstance.data.datasets[0].data = [0, 0, 0];
                bentoChartInstance.update();
            }
        } else {
            emptyMessage.classList.add('hidden');
            if (bentoChartInstance) {
                bentoChartInstance.data.datasets[0].data = [totalKarbo, totalProtein, totalLemak];
                bentoChartInstance.update();
            }
        }
    }

    foodItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            const foodData = {
                id: item.getAttribute('data-id'),
                kalori: item.getAttribute('data-kalori'),
                karbo: item.getAttribute('data-karbo'),
                protein: item.getAttribute('data-protein'),
                lemak: item.getAttribute('data-lemak'),
                imgSrcTray: item.getAttribute('data-img-tray') || item.querySelector('img').src, 
                name: item.querySelector('span').innerText
            };
            
            e.dataTransfer.setData('text/plain', JSON.stringify(foodData));
            setTimeout(() => item.classList.add('opacity-50'), 0);
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('opacity-50');
        });
    });

    dropzones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault(); 
            zone.classList.add('bg-orange-50', 'border-orange-300'); 
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('bg-orange-50', 'border-orange-300');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('bg-orange-50', 'border-orange-300');

            const foodDataString = e.dataTransfer.getData('text/plain');
            if (!foodDataString) return;
            
            const foodData = JSON.parse(foodDataString);
            trayState[zone.id] = foodData;

            zone.innerHTML = `
                <div class="relative w-full h-full flex items-center justify-center p-1 transform transition-transform animate-[bounce_0.5s_ease-out]">
                    <img src="${foodData.imgSrcTray}" alt="${foodData.name}" class="w-[90%] h-[90%] object-contain drop-shadow-xl pointer-events-none">
                </div>
            `;

            updateTrayStatistics();
        });
    });

    let pressTimer; 
    let startX = 0; 
    let startY = 0; 

    function showContextMenuCentered(zone) {
        activeZoneForDelete = zone.id;
        const rect = zone.getBoundingClientRect();
        
        contextMenu.style.visibility = 'hidden'; 
        contextMenu.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
        
        const menuWidth = contextMenu.offsetWidth;
        const menuHeight = contextMenu.offsetHeight;
        
        let posX = rect.left + (rect.width / 2) - (menuWidth / 2);
        let posY = rect.top + (rect.height / 2) - (menuHeight / 2);
        
        posX = Math.max(10, Math.min(posX, window.innerWidth - menuWidth - 10));
        posY = Math.max(10, Math.min(posY, window.innerHeight - menuHeight - 10));

        contextMenu.style.left = `${posX}px`;
        contextMenu.style.top = `${posY}px`;
        contextMenu.style.visibility = 'visible';
    }

    dropzones.forEach(zone => {
        zone.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (trayState[zone.id] !== null) {
                showContextMenuCentered(zone);
            }
        });

        zone.addEventListener('touchstart', (e) => {
            if (trayState[zone.id] !== null) {
                const touch = e.touches[0];
                startX = touch.clientX;
                startY = touch.clientY;

                pressTimer = window.setTimeout(() => {
                    showContextMenuCentered(zone);
                }, 500);
            }
        }, { passive: true });

        zone.addEventListener('touchend', () => {
            clearTimeout(pressTimer);
        });

        zone.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            const moveX = Math.abs(touch.clientX - startX);
            const moveY = Math.abs(touch.clientY - startY);
            
            if (moveX > 15 || moveY > 15) {
                clearTimeout(pressTimer);
            }
        });
    });

    const closeContextMenu = () => {
        contextMenu.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
    };

    document.addEventListener('click', closeContextMenu);
    document.addEventListener('touchstart', (e) => {
        if (!e.target.closest('.dropzone') && !e.target.closest('#custom-context-menu')) {
            closeContextMenu();
        }
    });
    btnBatalMenu.addEventListener('click', closeContextMenu);

    btnHapusMenu.addEventListener('click', () => {
        deleteModal.classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            deleteCard.classList.remove('scale-95', 'opacity-0');
        }, 10);
    });

    const closeDeleteModal = () => {
        deleteCard.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            deleteModal.classList.add('opacity-0', 'pointer-events-none');
            activeZoneForDelete = null; 
        }, 300);
    };

    btnCancelDelete.addEventListener('click', closeDeleteModal);
    document.getElementById('delete-backdrop').addEventListener('click', closeDeleteModal);

    btnConfirmDelete.addEventListener('click', () => {
        if (activeZoneForDelete) {
            trayState[activeZoneForDelete] = null;
            
            const zoneEl = document.getElementById(activeZoneForDelete);
            zoneEl.innerHTML = '';
            
            updateTrayStatistics();
        }
        closeDeleteModal();
    });

});