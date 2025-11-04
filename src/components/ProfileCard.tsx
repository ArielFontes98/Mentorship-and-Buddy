import { Building2, MapPin } from "lucide-react";

interface ProfileCardProps {
  name: string;
  email?: string;
  bu?: string;
  function?: string;
  country?: string;
  timeZone?: string;
  skills?: string[];
  description?: string;
  className?: string;
}

export function ProfileCard({
  name,
  email,
  bu,
  function: func,
  country,
  timeZone,
  skills,
  description,
  className = "",
}: ProfileCardProps) {
  return (
    <div className={`card ${className}`}>
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          {email && (
            <p className="text-sm text-gray-600 mt-1">{email}</p>
          )}
          
          <div className="mt-4 space-y-2">
            {bu && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 className="w-4 h-4" />
                <span>{bu}</span>
                {func && <span className="text-gray-400">•</span>}
                {func && <span>{func}</span>}
              </div>
            )}
            {(country || timeZone) && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {country && <span>{country}</span>}
                {country && timeZone && <span className="text-gray-400">•</span>}
                {timeZone && <span>{timeZone}</span>}
              </div>
            )}
          </div>
          
          {description && (
            <p className="text-sm text-gray-700 mt-3">{description}</p>
          )}
          
          {skills && skills.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-gray-500 mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

