// Données des gouvernorats de Tunisie
const governoratesData = {
    'Tunis': {
        population: '1,056,247',
        superficie: '288 km²',
        capitale: 'Tunis',
        description: 'Capitale de la Tunisie, centre politique et économique du pays'
    },
    'Ariana': {
        population: '576,088',
        superficie: '482 km²',
        capitale: 'Ariana',
        description: 'Gouvernorat urbain au nord de Tunis'
    },
    'Ben Arous': {
        population: '631,842',
        superficie: '761 km²',
        capitale: 'Ben Arous',
        description: 'Gouvernorat au sud de Tunis, important centre industriel'
    },
    'Manouba': {
        population: '421,638',
        superficie: '1,137 km²',
        capitale: 'Manouba',
        description: 'Gouvernorat agricole à l\'ouest de Tunis'
    },
    'Nabeul': {
        population: '787,920',
        superficie: '2,788 km²',
        capitale: 'Nabeul',
        description: 'Région touristique connue pour ses plages et artisanat'
    },
    'Zaghouan': {
        population: '176,945',
        superficie: '2,768 km²',
        capitale: 'Zaghouan',
        description: 'Région montagneuse connue pour ses sources d\'eau'
    },
    'Bizerte': {
        population: '568,219',
        superficie: '3,685 km²',
        capitale: 'Bizerte',
        description: 'Port important au nord, riche histoire maritime'
    },
    'Beja': {
        population: '303,032',
        superficie: '3,740 km²',
        capitale: 'Béja',
        description: 'Région agricole du nord-ouest'
    },
    'Jendouba': {
        population: '401,477',
        superficie: '3,102 km²',
        capitale: 'Jendouba',
        description: 'Région forestière au nord-ouest'
    },
    'Kef': {
        population: '243,156',
        superficie: '4,965 km²',
        capitale: 'Le Kef',
        description: 'Région montagneuse à la frontière algérienne'
    },
    'Siliana': {
        population: '223,087',
        superficie: '4,631 km²',
        capitale: 'Siliana',
        description: 'Région agricole du nord-ouest'
    },
    'Kairouan': {
        population: '570,559',
        superficie: '6,712 km²',
        capitale: 'Kairouan',
        description: 'Ville sainte, quatrième ville sainte de l\'Islam'
    },
    'Kasserine': {
        population: '439,243',
        superficie: '8,066 km²',
        capitale: 'Kasserine',
        description: 'Région montagneuse du centre-ouest'
    },
    'Sidi Bouzid': {
        population: '429,912',
        superficie: '7,405 km²',
        capitale: 'Sidi Bouzid',
        description: 'Berceau de la révolution tunisienne de 2011'
    },
    'Sousse': {
        population: '674,971',
        superficie: '2,669 km²',
        capitale: 'Sousse',
        description: 'Important centre touristique et économique'
    },
    'Monastir': {
        population: '548,828',
        superficie: '1,019 km²',
        capitale: 'Monastir',
        description: 'Ville côtière, destination touristique majeure'
    },
    'Mahdia': {
        population: '410,812',
        superficie: '2,966 km²',
        capitale: 'Mahdia',
        description: 'Port de pêche et station balnéaire'
    },
    'Sfax': {
        population: '955,421',
        superficie: '7,545 km²',
        capitale: 'Sfax',
        description: 'Deuxième ville du pays, grand centre économique'
    },
    'Gafsa': {
        population: '337,331',
        superficie: '7,807 km²',
        capitale: 'Gafsa',
        description: 'Centre minier important, riche en phosphates'
    },
    'Tozeur': {
        population: '107,912',
        superficie: '5,593 km²',
        capitale: 'Tozeur',
        description: 'Porte du désert, célèbre pour ses oasis'
    },
    'Kebili': {
        population: '156,961',
        superficie: '22,454 km²',
        capitale: 'Kébili',
        description: 'Région désertique, l\'une des plus chaudes au monde'
    },
    'Gabès': {
        population: '374,300',
        superficie: '7,166 km²',
        capitale: 'Gabès',
        description: 'Oasis maritime unique, port important'
    },
    'Medenine': {
        population: '479,520',
        superficie: '9,167 km²',
        capitale: 'Médenine',
        description: 'Région du sud-est, architecture troglodyte'
    },
    'Tataouine': {
        population: '149,453',
        superficie: '38,889 km²',
        capitale: 'Tataouine',
        description: 'Région désertique, paysages lunaires célèbres'
    }
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const tooltip = document.getElementById('tooltip');
    const mapImage = document.getElementById('mapImage');
    const mapOverlay = document.getElementById('mapOverlay');
    
    // Fonction pour ajuster le SVG à la taille de l'image
    function adjustSVGSize() {
        const imgRect = mapImage.getBoundingClientRect();
        const containerRect = mapImage.parentElement.getBoundingClientRect();
        
        mapOverlay.style.width = imgRect.width + 'px';
        mapOverlay.style.height = imgRect.height + 'px';
        mapOverlay.style.left = (imgRect.left - containerRect.left) + 'px';
        mapOverlay.style.top = (imgRect.top - containerRect.top) + 'px';
        
        // Définir le viewBox du SVG pour correspondre aux dimensions de l'image originale
        const naturalWidth = mapImage.naturalWidth;
        const naturalHeight = mapImage.naturalHeight;
        mapOverlay.setAttribute('viewBox', `0 0 ${naturalWidth} ${naturalHeight}`);
    }
    
    // Ajuster au chargement et au redimensionnement
    mapImage.addEventListener('load', adjustSVGSize);
    window.addEventListener('resize', adjustSVGSize);
    adjustSVGSize();
    
    // Fonction pour créer une page de détails pour un gouvernorat
    function createGovernorateDetailPage(govName) {
        const data = governoratesData[govName];
        
        const detailHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${govName} - Gouvernorat de Tunisie</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        .detail-container {
            max-width: 800px;
            margin: 50px auto;
            padding: 40px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 25px;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.25);
        }
        .detail-header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #c8102e;
        }
        .detail-header h1 {
            font-size: 3em;
            color: #c8102e;
            margin-bottom: 10px;
        }
        .detail-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .info-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            border-radius: 15px;
            color: white;
            text-align: center;
        }
        .info-card h3 {
            font-size: 0.9em;
            margin-bottom: 10px;
            opacity: 0.9;
        }
        .info-card p {
            font-size: 1.4em;
            font-weight: 600;
        }
        .description {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
        }
        .description p {
            font-size: 1.1em;
            line-height: 1.8;
            color: #2c3e50;
        }
        .back-button {
            display: inline-block;
            padding: 15px 30px;
            background: #c8102e;
            color: white;
            text-decoration: none;
            border-radius: 10px;
            font-weight: 600;
            transition: all 0.3s;
        }
        .back-button:hover {
            background: #a00d25;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(200, 16, 46, 0.3);
        }
    </style>
</head>
<body>
    <div class="page-wrapper">
        <div class="detail-container">
            <div class="detail-header">
                <h1>🏛️ ${govName}</h1>
                <p style="font-size: 1.2em; color: #7f8c8d;">Gouvernorat de Tunisie</p>
            </div>
            
            <div class="detail-info">
                <div class="info-card">
                    <h3>👥 Population</h3>
                    <p>${data.population}</p>
                </div>
                <div class="info-card">
                    <h3>📏 Superficie</h3>
                    <p>${data.superficie}</p>
                </div>
                <div class="info-card">
                    <h3>🏛️ Capitale</h3>
                    <p>${data.capitale}</p>
                </div>
            </div>
            
            <div class="description">
                <h2 style="margin-bottom: 15px; color: #2c3e50;">📖 Description</h2>
                <p>${data.description}</p>
            </div>
            
            <div style="text-align: center;">
                <a href="index.html" class="back-button">← Retour à la carte</a>
            </div>
        </div>
    </div>
</body>
</html>
        `;
        
        return detailHTML;
    }
    
    // Récupérer toutes les zones cliquables (rectangles SVG)
    const govAreas = document.querySelectorAll('.gov-area');
    
    govAreas.forEach(area => {
        const govName = area.getAttribute('data-gov');
        
        // Événement mouseenter - afficher le tooltip et la ligne de soulignement
        area.addEventListener('mouseenter', function(e) {
            tooltip.textContent = govName;
            tooltip.classList.add('show');
            updateTooltipPosition(e);
        });
        
        // Événement mousemove - suivre le curseur avec le tooltip
        area.addEventListener('mousemove', function(e) {
            updateTooltipPosition(e);
        });
        
        // Événement mouseleave - cacher le tooltip
        area.addEventListener('mouseleave', function() {
            tooltip.classList.remove('show');
        });
        
        // Événement click - ouvrir la page de détails
        area.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animation visuelle au clic
            area.style.fill = 'rgba(200, 16, 46, 0.3)';
            setTimeout(() => {
                area.style.fill = 'transparent';
            }, 300);
            
            // Créer et ouvrir la page de détails
            setTimeout(() => {
                const detailPage = createGovernorateDetailPage(govName);
                const blob = new Blob([detailPage], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
            }, 150);
        });
        
        // Améliorer l'accessibilité au clavier
        area.addEventListener('focus', function(e) {
            tooltip.textContent = govName;
            tooltip.classList.add('show');
            const rect = mapImage.getBoundingClientRect();
            tooltip.style.left = (rect.left + rect.width / 2) + 'px';
            tooltip.style.top = (rect.top - 50) + 'px';
        });
        
        area.addEventListener('blur', function() {
            tooltip.classList.remove('show');
        });
    });
    
    // Fonction pour mettre à jour la position du tooltip
    function updateTooltipPosition(e) {
        const offset = 15;
        tooltip.style.left = (e.pageX + offset) + 'px';
        tooltip.style.top = (e.pageY - tooltip.offsetHeight - offset) + 'px';
    }
    
    // Messages de console
    console.log('%c🇹🇳 Carte Interactive de la Tunisie', 'font-size: 20px; font-weight: bold; color: #c8102e;');
    console.log('%cPassez votre curseur sur les noms des gouvernorats pour voir le soulignement!', 'font-size: 14px; color: #2c3e50;');
    console.log('✅ 24 gouvernorats avec effet de soulignement activé');
});