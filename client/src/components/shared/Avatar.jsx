import { getInitials, stringToColor } from "../../utils/helpers";

const Avatar = ({ user, size = "md", className = "" }) => {
  const sizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl",
  };

  const colorClass = stringToColor(user?.name || "User");

  if (user?.avatar?.url) {
    return (
      <img
        src={user.avatar.url}
        alt={user.name}
        className={`
          ${sizes[size]} rounded-full object-cover
          ring-2 ring-white dark:ring-gray-800
          ${className}
        `}
      />
    );
  }

  return (
    <div
      className={`
        ${sizes[size]} ${colorClass}
        rounded-full flex items-center justify-center
        text-white font-semibold select-none
        ring-2 ring-white dark:ring-gray-800
        ${className}
      `}
    >
      {getInitials(user?.name)}
    </div>
  );
};

export default Avatar;
