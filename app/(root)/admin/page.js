// app/admin/page.js
'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [formType, setFormType] = useState('manga');
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/add-${formType}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    alert(result.message || JSON.stringify(result));
    formType === 'manga' ? setFormData({}) : setFormData(prev => ({ ...prev, cover: "", searchResults: [] }));
  };

  return (
    <div className="flex items-center min-h-[81.5vh] justify-center bg-gradient-to-r from-slate-900 to-slate-700">
        <div className="p-6 max-w-xl  mx-auto text-white bg-slate-800 rounded-lg shadow-md">
        <h1 className="text-2xl mb-4">Admin Panel</h1>

        <select
            onChange={(e) => { setFormType(e.target.value); setFormData({}); }}
            className="mb-4 p-2 rounded text-black w-full"
            >
            <option value="manga">Add Manga</option>
            <option value="volume">Add Volume</option>
            <option value="chapter">Add Chapter</option>
        </select>

        <form onSubmit={handleSubmit} className="space-y-4">
            {formType === 'manga' && (
            <>
                <input name="title" placeholder="Title" onChange={handleChange} className="p-2 w-full text-black rounded" />
                <input name="author" placeholder="Author" onChange={handleChange} className="p-2 w-full text-black rounded" />
                <input name="description" placeholder="Description" onChange={handleChange} className="p-2 w-full text-black rounded" />
                <input name="cover_image_url" placeholder="Image URL" onChange={handleChange} className="p-2 w-full text-black rounded" />
                <input name="chapter_count" placeholder="Total no. of chapters" onChange={handleChange} className="p-2 w-full text-black rounded" />
            </>
            )}

            {formType === 'volume' && (
              <>
                <input
                  type="text"
                  placeholder="Search Manga Title"
                  value={formData.searchQuery || ''}
                  onChange={async (e) => {
                    const query = e.target.value;
                    setFormData((prev) => ({ ...prev, searchQuery: query }));

                    if (query.trim().length > 0) {
                      const res = await fetch(`/api/admin/search-manga?query=${query}`);
                      const data = await res.json();
                      setFormData((prev) => ({ ...prev, searchResults: data.manga || [] }));
                    } else {
                      setFormData((prev) => ({ ...prev, searchResults: [] }));
                    }
                  }}
                  className="p-2 w-full text-black rounded"
                />

                {formData.searchResults?.length > 0 && (
                  <ul className="bg-white border border-gray-300 rounded shadow-md max-h-48 overflow-y-auto">
                    {formData.searchResults.map((manga) => (
                      <li
                        key={manga.id}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            manga_id: manga.id,
                            searchQuery: manga.title,
                            searchResults: [],
                          }))
                        }
                        className="cursor-pointer px-4 py-2 hover:bg-gray-200 text-black"
                      >
                        {manga.title} (ID: {manga.id})
                      </li>
                    ))}
                  </ul>
                )}

                <input
                  type="hidden"
                  name="manga_id"
                  value={formData.manga_id || ''}
                />

                <input
                  name="volume_number"
                  placeholder="Volume Number"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, volume_number: e.target.value }))
                  }
                  value={formData.volume_number || ''}
                  className="p-2 w-full text-black rounded mt-2"
                />
                <input
                  name="title"
                  placeholder="volume title"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  value={formData.title || ''}
                  className="p-2 w-full text-black rounded mt-2"
                />
                <input
                  name="cover"
                  placeholder="Volume Cover url"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, cover: e.target.value }))
                  }
                  value={formData.cover || ''}
                  className="p-2 w-full text-black rounded mt-2"
                />
                <input
                  name="release"
                  placeholder="Release Date"
                  type='date'
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, release: e.target.value }))
                  }
                  value={formData.release || ''}
                  className="p-2 w-full text-black rounded mt-2"
                />
              
              </>
            )}


            {formType === 'chapter' && (
                <>
                <input name="volume_id" placeholder="Volume ID" onChange={handleChange} className="p-2 w-full text-black rounded" />
                <input name="chapter_number" placeholder="Chapter Number" onChange={handleChange} className="p-2 w-full text-black rounded" />
                <input name="title" placeholder="Chapter Title" onChange={handleChange} className="p-2 w-full text-black rounded" />
            </>
            )}

            <button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full flex-center text-white px-4 py-2 rounded">
            Add {formType.charAt(0).toUpperCase() + formType.slice(1)}
            </button>
        </form>
        </div>
    </div>
  );
}
