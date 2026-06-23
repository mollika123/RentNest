'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner } from '@heroui/react';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  const tenantEmail = "tenant@example.com"; 

 
  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/my-favorites?email=${tenantEmail}`);
      const data = await res.json();
       console.log("API RESPONSE:", data); 
      setFavorites(data);
   
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {


    fetchFavorites();
  }, []);

 
  const handleRemove = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (data.deletedCount > 0) {
        // ডাটাবেজে সফলভাবে ডিলিট হলে UI স্টেট থেকে ফিল্টার করে সরিয়ে দিবে
        setFavorites(favorites.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">My Favorites</h1>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Favorites properties table">
          <Table.Header>
  
  <Table.Column isRowHeader>Property Name</Table.Column>
  <Table.Column>Location</Table.Column>
  <Table.Column>Price</Table.Column>
  <Table.Column align="end">Actions</Table.Column>
</Table.Header>
            
            <Table.Body>
              {loading ? (
                <Table.Row>
                  <Table.Cell colSpan={4} className="text-center py-8">
                    <Spinner label="Loading Favorites..." />
                  </Table.Cell>
                </Table.Row>
              ) : favorites.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={4} className="text-center text-gray-500 py-8">
                    Your favorites list is empty.
                  </Table.Cell>
                </Table.Row>
              ) : (
                    favorites.map((item) => (
                 
                  <Table.Row key={item._id}>
                    <Table.Cell className="font-semibold text-slate-700">
                      {item.propertyName || "N/A"}
                    </Table.Cell>
                    <Table.Cell>{item.location || "N/A"}</Table.Cell>
                    <Table.Cell>৳{item.price || "0"}/month</Table.Cell>
                    <Table.Cell align="end">
                      <Button 
                        color="danger" 
                        variant="flat" 
                        size="sm"
                        onPress={() => handleRemove(item._id)}
                      >
                        Remove
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer>
          {/* Optional Footer */}
        </Table.Footer>
      </Table>
    </div>
  );
}