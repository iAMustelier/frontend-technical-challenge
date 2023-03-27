export interface BadgeProps {
    icon?: JSX.Element;
    text: string;
    className?: string;
}

export const Badge = ({ icon, text, className }: BadgeProps) => {
    return (
        <div
            className={`flex items-center px-2 py-1 rounded-full text-sm font-medium 'bg-gray-100 text-gray-800'
             ${className}`}
        >
            {icon && <span className="mr-1">{icon}</span>}
            <p>{text}</p>
        </div>
    );
};
