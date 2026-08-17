import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { getStoredReadList } from '../../utility/localStorage';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560', '#775DD0', '#00E396', '#FEB019'];

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    ${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const PagesToRead = () => {
    const allBooks = useLoaderData();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const storedIds = getStoredReadList();
        if (allBooks?.length > 0) {
            const readBooks = allBooks.filter(book => storedIds.includes(book.bookId));
            const formattedData = readBooks.map(book => ({
                name: book.bookName,
                pages: book.totalPages
            }));
            setChartData(formattedData);
        }
    }, [allBooks]);

    if (chartData.length === 0) {
        return (
            <div className="bg-base-200 border border-base-300 rounded-3xl p-8 sm:p-12 my-8 text-center">
                <h2 className="text-lg sm:text-xl font-semibold text-base-content">No read history found to display chart!</h2>
                <p className="text-xs sm:text-sm text-base-content/60 mt-2">Read some books first from book details.</p>
            </div>
        );
    }

    return (
        <div className="bg-base-200 border border-base-300 rounded-3xl p-4 sm:p-8 my-8 flex flex-col items-center">
            <h2 className="text-lg sm:text-xl font-bold text-base-content mb-6">Pages Read Statistics</h2>
            <div className="w-full h-[340px] sm:h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" angle={-25} textAnchor="end" interval={0} height={70} tick={{ fontSize: 11, fill: 'currentColor' }} />
                        <YAxis tick={{ fill: 'currentColor' }} />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--color-base-100, #fff)', borderColor: 'var(--color-base-300, #ccc)', borderRadius: '12px' }} />
                        <Bar dataKey="pages" fill="#8884d8" shape={<TriangleBar />}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PagesToRead;