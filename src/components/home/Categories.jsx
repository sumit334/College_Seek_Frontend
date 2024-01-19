import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { categories } from '../../constants/data';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
    margin: auto; /* Center-align the table */
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
    &:hover {
        background: #4169E1; /* Change color on hover */
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        font-weight: bold; /* Highlight on hover */
        color: blue;
    }
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return (
        <>
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Seek</StyledButton>
            </Link>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to="/" style={{ fontWeight: category ? 'normal' : 'bold' }}>
                                ALL SEEK
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((categoryItem) => (
                        <TableRow key={categoryItem.id}>
                            <TableCell>
                                <StyledLink
                                    to={`/?category=${categoryItem.type}`}
                                    style={{ fontWeight: category === categoryItem.type ? 'bold' : 'normal' }}
                                >
                                    {categoryItem.type}
                                </StyledLink>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </>
    );
};

export default Categories;
