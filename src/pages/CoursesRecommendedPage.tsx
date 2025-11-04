import { useState, useMemo } from "react";
import { courses } from "../mock/coursesData";
import { CourseCard } from "../components/CourseCard";
import { Search, X } from "lucide-react";

export function CoursesRecommendedPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  // Get all unique skills and categories
  const allSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    courses.forEach((course) => {
      course.skills.forEach((skill) => skillsSet.add(skill));
    });
    return Array.from(skillsSet).sort();
  }, []);

  const allCategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    courses.forEach((course) => categoriesSet.add(course.category));
    return Array.from(categoriesSet).sort();
  }, []);

  // Filter courses based on search and filters
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.skills.some((skill) => skill.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== "all" && course.category !== selectedCategory) {
        return false;
      }

      // Level filter
      if (selectedLevel !== "all" && course.level !== selectedLevel) {
        return false;
      }

      // Skills filter
      if (selectedSkills.length > 0) {
        const hasSelectedSkill = selectedSkills.some((skill) =>
          course.skills.includes(skill)
        );
        if (!hasSelectedSkill) return false;
      }

      return true;
    });
  }, [searchQuery, selectedSkills, selectedCategory, selectedLevel]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recommended Training
          </h1>
          <p className="text-lg text-gray-600 mb-1">
            Discover courses based on skills you want to develop
          </p>
          <p className="text-sm text-gray-500">
            Search and filter courses to build your learning path
          </p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses by title, description, or skills..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {allCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Skills Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills to Develop
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.length > 0 ? (
                  <>
                    {selectedSkills.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className="px-3 py-1 bg-primary-600 text-white rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-primary-700"
                      >
                        {skill}
                        <X className="w-3 h-3" />
                      </button>
                    ))}
                  </>
                ) : (
                  <span className="text-sm text-gray-500">Select skills below</span>
                )}
              </div>
            </div>
          </div>

          {/* Available Skills */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2">Available Skills:</p>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedSkills.includes(skill)
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Found <span className="font-semibold">{filteredCourses.length}</span> courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              showActions={true}
              onSelect={(courseId) => {
                alert(`Starting course: ${courseId}`);
                // In a real app, this would track progress
              }}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="card text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">No courses found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSkills([]);
                setSelectedCategory("all");
                setSelectedLevel("all");
              }}
              className="btn-secondary mt-4"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

