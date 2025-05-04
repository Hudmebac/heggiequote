'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories, Category } from '@/lib/quotes';

interface CategorySelectProps {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex w-full items-center justify-center max-w-xs"> {/* Added max-width */}
      <Select
        onValueChange={(value) => setSelectedCategory(value as Category)}
        defaultValue={selectedCategory}
      >
        {/* Apply standard input styling for consistency */}
        <SelectTrigger className="w-full bg-input text-foreground border-border focus:ring-ring">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        {/* Content uses popover styling by default */}
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelect;
