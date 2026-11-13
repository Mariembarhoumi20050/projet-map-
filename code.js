/* ========================================
   FICHIER JAVASCRIPT COMMUN
   Gère les interactions sur la carte
   ======================================== */

// Attendre que la page soit complètement chargée
document.addEventListener('DOMContentLoaded', function() {
    
    /* ========== RÉCUPÉRATION DES ÉLÉMENTS ========== */
    const tooltip = document.getElementById('tooltip');        // Info-bulle qui suit le curseur
    const mapImage = document.getElementById('mapImage');      // Image de la carte
    const mapOverlay = document.getElementById('mapOverlay');  // SVG superposé
    
    /* ========================================
       FONCTION : AJUSTER LA TAILLE DU SVG
       ======================================== 
       Cette fonction permet au SVG de suivre exactement
       la taille et la position de l'image de la carte
    */
    function adjustSVGSize() {
        // Récupérer les dimensions de l'image
        const imgRect = mapImage.getBoundingClientRect();
        const containerRect = mapImage.parentElement.getBoundingClientRect();
        
        // Ajuster le SVG pour qu'il se superpose parfaitement
        mapOverlay.style.width = imgRect.width + 'px';
        mapOverlay.style.height = imgRect.height + 'px';
        mapOverlay.style.left = (imgRect.left - containerRect.left) + 'px';
        mapOverlay.style.top = (imgRect.top - containerRect.top) + 'px';
        
        // Définir le viewBox du SVG (espace de coordonnées)
        const naturalWidth = mapImage.naturalWidth;
        const naturalHeight = mapImage.naturalHeight;
        mapOverlay.setAttribute('viewBox', `0 0 ${naturalWidth} ${naturalHeight}`);
    }
    
    // Appeler la fonction quand l'image est chargée
    mapImage.addEventListener('load', adjustSVGSize);
    
    // Appeler la fonction quand on redimensionne la fenêtre
    window.addEventListener('resize', adjustSVGSize);
    
    // Appeler la fonction immédiatement
    adjustSVGSize();
    
    
    /* ========================================
       FONCTION : AFFICHER LE TOOLTIP
       ======================================== 
       Met à jour la position du tooltip pour qu'il
       suive le curseur de la souris
    */
    function updateTooltipPosition(event) {
        const offset = 15;  // Décalage en pixels
        
        // Positionner le tooltip près du curseur
        tooltip.style.left = (event.pageX + offset) + 'px';
        tooltip.style.top = (event.pageY - tooltip.offsetHeight - offset) + 'px';
    }
    
    
    /* ========================================
       RÉCUPÉRATION DES ZONES CLIQUABLES
       ======================================== */
    const govAreas = document.querySelectorAll('.gov-area');
    
    // Parcourir toutes les zones (une boucle pour chaque gouvernorat)
    govAreas.forEach(area => {
        // Récupérer le nom et le fichier depuis les attributs data-*
        const govName = area.getAttribute('data-gov');           // Ex: "tunis"
        const govFile = area.getAttribute('data-file');          // Ex: "gouvernorats/tunis.html"
        
        // Récupérer la ligne de soulignement correspondante
        const underline = document.querySelector(`.gov-underline[data-gov="${govName}"]`);
        
        
        /* ========== ÉVÉNEMENT : SURVOL (mouseenter) ========== 
           Quand la souris entre dans la zone
        */
        area.addEventListener('mouseenter', function(event) {
            // Afficher le nom du gouvernorat dans le tooltip
            tooltip.textContent = capitalizeFirstLetter(govName.replace('-', ' '));
            tooltip.classList.add('show');
            
            // Activer le soulignement
            if (underline) {
                underline.classList.add('active');
            }
            
            // Positionner le tooltip
            updateTooltipPosition(event);
        });
        
        
        /* ========== ÉVÉNEMENT : MOUVEMENT (mousemove) ========== 
           Quand la souris bouge dans la zone
        */
        area.addEventListener('mousemove', function(event) {
            updateTooltipPosition(event);
        });
        
        
        /* ========== ÉVÉNEMENT : SORTIE (mouseleave) ========== 
           Quand la souris sort de la zone
        */
        area.addEventListener('mouseleave', function() {
            // Cacher le tooltip
            tooltip.classList.remove('show');
            
            // Désactiver le soulignement
            if (underline) {
                underline.classList.remove('active');
            }
        });
        
        
        /* ========== ÉVÉNEMENT : CLIC (click) ========== 
           Quand on clique sur une zone
           ⚠️ SANS ANIMATION DE FLASH ROUGE
        */
        area.addEventListener('click', function(event) {
            event.preventDefault();  // Empêcher le comportement par défaut
            
            // OUVRIR LA PAGE DU GOUVERNORAT directement
            // '_blank' = nouvel onglet
            window.open(govFile, '_blank');
        });
        
        
        /* ========== ACCESSIBILITÉ CLAVIER ========== */
        
        // Événement : focus (quand on sélectionne avec Tab)
        area.addEventListener('focus', function(event) {
            tooltip.textContent = capitalizeFirstLetter(govName.replace('-', ' '));
            tooltip.classList.add('show');
            
            if (underline) {
                underline.classList.add('active');
            }
            
            // Positionner le tooltip au centre de l'image
            const rect = mapImage.getBoundingClientRect();
            tooltip.style.left = (rect.left + rect.width / 2) + 'px';
            tooltip.style.top = (rect.top - 50) + 'px';
        });
        
        // Événement : blur (quand on perd le focus)
        area.addEventListener('blur', function() {
            tooltip.classList.remove('show');
            
            if (underline) {
                underline.classList.remove('active');
            }
        });
    });
    
    
    /* ========================================
       FONCTION UTILITAIRE : Première lettre en majuscule
       ======================================== */
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    
    /* ========== MESSAGES DE CONSOLE ========== */
    console.log('%c🇹🇳 Carte Interactive de la Tunisie', 'font-size: 20px; font-weight: bold; color: #c8102e;');
    console.log('%cCliquez sur les noms des gouvernorats pour voir les détails!', 'font-size: 14px; color: #2c3e50;');
    console.log('✅ 24 gouvernorats interactifs activés');
});