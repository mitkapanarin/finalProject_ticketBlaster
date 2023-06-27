

export const handleSearch = async () => {
    try {
      const response = await fetch(`/api/events?search=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };