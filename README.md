# Club de Badminton - Site Web

Un site web moderne et responsive pour un club de badminton, créé avec HTML, CSS et JavaScript vanilla.

## 🏸 Fonctionnalités

- **Design moderne** : Interface propre en bleu et blanc
- **Responsive** : Adapté à tous les écrans (mobile, tablette, desktop)
- **Navigation** : Menu avec sous-menus déroulants
- **Galerie photos** : Avec système de filtres et lightbox
- **Formulaire de contact** : Intégration EmailJS
- **Pages complètes** : Présentation, équipe, histoire, entraînements, compétitions, stages

## 🚀 Installation et Déploiement

### Déploiement local
1. Téléchargez tous les fichiers
2. Ouvrez `index.html` dans votre navigateur
3. Ou utilisez un serveur local (ex: Live Server sur VS Code)

### Déploiement sur hébergeur
1. Uploadez tous les fichiers sur votre serveur web
2. Configurez EmailJS pour le formulaire de contact
3. Remplacez les images placeholder par vos vraies photos

## 📧 Configuration du Formulaire de Contact

Le formulaire utilise EmailJS pour l'envoi d'emails. Voici comment le configurer :

### 1. Créer un compte EmailJS
- Allez sur https://www.emailjs.com/
- Créez un compte gratuit
- Créez un service email (Gmail, Outlook, etc.)

### 2. Créer un template d'email
```
Sujet: {{subject}}

Nom: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

Envoyé depuis le site du Club de Badminton
```

### 3. Configurer le JavaScript
Dans le fichier `js/main.js`, remplacez les valeurs dans `EMAILJS_CONFIG` :
```javascript
const EMAILJS_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID',     // Remplacer par votre Service ID
    templateId: 'YOUR_TEMPLATE_ID',   // Remplacer par votre Template ID
    publicKey: 'YOUR_PUBLIC_KEY'      // Remplacer par votre Public Key
};
```

## 🖼️ Images à Remplacer

Remplacez les images placeholder par vos vraies photos :

### Images principales
- `images/hero-badminton.jpg` - Photo de bannière (1200x600px)
- `images/club-presentation.jpg` - Photo de présentation (800x400px)

### Galerie d'accueil
- `images/gallery1.jpg` - Entraînements
- `images/gallery2.jpg` - Compétitions  
- `images/gallery3.jpg` - Équipe
- `images/gallery4.jpg` - Tournois

### Galerie complète
- `images/training1-6.jpg` - Photos d'entraînements
- `images/competition1-5.jpg` - Photos de compétitions
- `images/event1-5.jpg` - Photos d'événements

**Dimensions recommandées** : 800x600px pour toutes les photos de galerie

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans `css/style.css` avec des variables CSS :
```css
:root {
    --primary-color: #2563eb;    /* Bleu principal */
    --secondary-color: #1e40af;  /* Bleu foncé */
    --accent-color: #3b82f6;     /* Bleu accent */
    --white: #ffffff;
    --light-gray: #f8fafc;
    --gray: #64748b;
    --dark-gray: #334155;
    --text-dark: #1e293b;
}
```

### Contenu
Modifiez facilement le contenu dans les fichiers HTML :
- Informations du club
- Horaires d'entraînement
- Coordonnées de contact
- Textes de présentation

## 📱 Responsive Design

Le site s'adapte automatiquement aux différentes tailles d'écran :
- **Desktop** : Affichage complet avec tous les éléments
- **Tablette** : Adaptation des grilles et du menu
- **Mobile** : Menu burger, layout vertical

## 🔧 Structure des Fichiers

```
/
├── index.html              # Page d'accueil
├── css/
│   └── style.css          # Styles principaux
├── js/
│   └── main.js           # JavaScript (navigation, formulaire, etc.)
├── pages/
│   ├── presentation.html  # Page de présentation
│   ├── equipe.html       # Page équipe
│   ├── histoire.html     # Page histoire
│   ├── entrainements.html # Page entraînements
│   ├── competitions.html  # Page compétitions
│   ├── stages.html       # Page stages
│   └── galerie.html      # Galerie complète
├── images/               # Dossier des images (à créer)
└── README.md            # Ce fichier
```

## 🌐 Hébergement Recommandé

Le site fonctionne sur tout hébergeur web standard :
- **GitHub Pages** (gratuit)
- **Netlify** (gratuit)
- **Vercel** (gratuit)
- **OVH**, **O2Switch**, etc. (payant)

## 📞 Support

Pour toute question ou personnalisation, contactez l'équipe de développement.

---

**Version** : 1.0  
**Dernière mise à jour** : Janvier 2025  
**Compatibilité** : Tous navigateurs modernes
