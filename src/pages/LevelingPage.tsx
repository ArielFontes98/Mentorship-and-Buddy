import { useState } from "react";
import { levelExpectations } from "../mock/levelingData";
import { userProfile } from "../mock/profileData";
import { CheckCircle2, Target, BookOpen, Award } from "lucide-react";

export function LevelingPage() {
  const [selectedLevel, setSelectedLevel] = useState(userProfile.currentLevel);
  const [selectedFunction, setSelectedFunction] = useState(userProfile.currentFunction);

  const currentExpectation = levelExpectations.find(
    (exp) => exp.level === selectedLevel && exp.function === selectedFunction
  );

  const allLevels = Array.from(new Set(levelExpectations.map((e) => e.level))).sort();
  const allFunctions = Array.from(new Set(levelExpectations.map((e) => e.function))).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Level Expectations
          </h1>
          <p className="text-lg text-gray-600 mb-1">
            Understand what's expected at each level
          </p>
          <p className="text-sm text-gray-500">
            Your current level: <span className="font-medium text-primary-600">{userProfile.currentLevel}</span> • {userProfile.currentFunction}
          </p>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {allLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Function
              </label>
              <select
                value={selectedFunction}
                onChange={(e) => setSelectedFunction(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {allFunctions.map((func) => (
                  <option key={func} value={func}>
                    {func}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Expectations */}
        {currentExpectation ? (
          <div className="space-y-6">
            {/* Skills Overview */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary-600" />
                Expected Skills - {currentExpectation.level} {currentExpectation.function}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentExpectation.skills.map((skill, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{skill.name}</h3>
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                        Level {skill.expectedLevel}/5
                      </span>
                    </div>
                    {skill.description && (
                      <p className="text-sm text-gray-600">{skill.description}</p>
                    )}
                    <div className="mt-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-primary-600 rounded-full transition-all"
                          style={{ width: `${(skill.expectedLevel / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expectations by Category */}
            {currentExpectation.expectations.map((category, idx) => (
              <div key={idx} className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  {category.category === "Technical Skills" && <BookOpen className="w-5 h-5 text-primary-600" />}
                  {category.category === "Decision Making" && <Target className="w-5 h-5 text-primary-600" />}
                  {category.category === "Communication" && <Award className="w-5 h-5 text-primary-600" />}
                  {category.category === "Execution" && <CheckCircle2 className="w-5 h-5 text-primary-600" />}
                  {category.category}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No expectations defined for {selectedLevel} {selectedFunction} yet.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Try selecting a different level or function.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

