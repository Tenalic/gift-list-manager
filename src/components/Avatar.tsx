interface AvatarProps {
  // Pseudo utilisé pour la lettre par défaut (première lettre, en majuscule).
  pseudo: string;
  // Optionnel : si fourni, affiche l'image à la place de la lettre (future photo de profil).
  imageUrl?: string;
  // Taille du rond en pixels (par défaut 40).
  size?: number;
}

// Avatar circulaire réutilisable : lettre du pseudo sur fond marron/doré,
// ou image si `imageUrl` est fournie. Purement présentationnel (pas de lien ici).
export default function Avatar({ pseudo, imageUrl, size = 40 }: AvatarProps) {
  const lettre = pseudo.trim().charAt(0).toUpperCase() || "?";
  const style = { width: `${size}px`, height: `${size}px`, fontSize: `${Math.round(size * 0.45)}px` };

  return (
    <span className="avatar-gaming" style={style} aria-hidden="true">
      {imageUrl ? (
        <img className="avatar-gaming-img" src={imageUrl} alt="" />
      ) : (
        <span className="avatar-gaming-letter">{lettre}</span>
      )}
    </span>
  );
}
