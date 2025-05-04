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
    <div className="flex w-full items-center justify-center">
      <Select
        onValueChange={(value) => setSelectedCategory(value as Category)}
        defaultValue={selectedCategory}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
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