   export const formatDate = (date) => {
      if (!date) return 'Unknown date';
      const d = new Date(date);
      const day = d.getDate();
      const month = d.toLocaleString('default', { month: 'long' });
      const year = d.getFullYear();

      // Helper to add ordinal suffix
      const getOrdinal = (n) => {
         const s = ['th', 'st', 'nd', 'rd'];
         const v = n % 100;
         return s[(v - 20) % 10] || s[v] || s[0];
      };

      return `${day}${getOrdinal(day)} ${month} ${year}`;
   };