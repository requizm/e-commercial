import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Get, Post } from '../../../../util/ApiCall';
import './style/CategoryList.scss';

export class Category {
    id!: number;
    name: string | undefined;
    parent: Category | undefined
}

export function CategoryList() {

    const [categories, setCategories] = useState([]);
    const [formSubmit, setFormSubmit] = useState('');

    async function updateCategoryList() {
        const response = await Get('category/getall');
        const categories = await response.json();
        setCategories(categories);
    }

    useEffect(() => {
        updateCategoryList();
    }, [])

    async function deleteCategory(id: number) {
        const response = await Post('', `category/delete/${id}`);
        if (response.ok) {
            updateCategoryList();
            setFormSubmit("");
        }
        else {
            const responseText = await response.text();
            setFormSubmit(responseText);
        }
    }

    return <div className="category-table">
        <table>
            <thead>
                <tr>
                    <th>İd</th>
                    <th>İsim</th>
                    <th>Üst Kategori</th>
                    <th>İşlemler</th>
                </tr>
            </thead>
            <tbody>
                {
                    categories.map((category: Category) => {
                        return <tr>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.parent?.name}</td>
                            <td>
                                <Link to={'/admin/categories/update/' + category.id}>Update</Link>
                                <button onClick={() => deleteCategory(category.id)}>Delete</button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        <div className="status">
            <div className="status-text">{formSubmit}</div>
        </div>
    </div>
}