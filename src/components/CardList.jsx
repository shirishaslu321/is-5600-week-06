import React, { useState, useEffect } from "react";
import Card from './Card';
import Button from './Button';
import Search from './Search';

const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [filteredData, setFilteredData] = useState(data); // Store filtered data
  const [products, setProducts] = useState(data.slice(0, limit));

  // Update paginated products when offset or filteredData changes
  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);

  // Filter products by tags
  const filterTags = (tagQuery) => {
    const filtered = data.filter(product =>
      tagQuery
        ? product.tag && product.tag.some(({ title }) => title.toLowerCase() === tagQuery.toLowerCase())
        : true // If no tagQuery, return all products
    );

    setOffset(0); // Reset pagination
    setFilteredData(filtered); // Update filtered data
  };

  // Pagination handlers
  const handlePrevious = () => {
    setOffset(prevOffset => Math.max(prevOffset - limit, 0));
  };

  const handleNext = () => {
    setOffset(prevOffset => Math.min(prevOffset + limit, filteredData.length - limit));
  };

  return (
    <div className="cf pa2">
      {/* Search Component */}
      <Search handleSearch={filterTags} />

      {/* Cards */}
      <div className="mt2 mb2">
        {products.length > 0 ? (
          products.map(product => <Card key={product.id} {...product} />)
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} disabled={offset + limit >= filteredData.length} />
      </div>
    </div>
  );
};

export default CardList;