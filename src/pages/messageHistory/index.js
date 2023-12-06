import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpandableTable from '../../components/ExpandableTable/ExpandableTable';
import api from '../../utils/api';
import { getCurrentUser } from '../../utils/auth';
import { format } from 'date-fns';

export function MessageHistoryList() {
    const navigate = useNavigate();
    const [userData, setUsersData] = useState([]);
    const [columns, setColumns] = useState([]);
    const currentUser = getCurrentUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                let institutionName;

                // Verificar se o usuário atual é um gerente
                if (currentUser && currentUser.accessLevel === 'manager') {
                    // Se for gerente, buscar o nome da instituição
                    const institutionResponse = await api.get(`/institutions`);
                    
                    if (institutionResponse.data && institutionResponse.data.length > 0) {
                        institutionName = institutionResponse.data[0].name;
                    }
                }

                // Agora, buscar todas as mensagens e filtrar pelo nome da instituição (se disponível)
                const messagesResponse = await api.get('/messagehistory');

                const formattedData = messagesResponse.data
                    .filter(item => !institutionName || item.nameInstituiton === institutionName)
                    .map(item => ({
                        ...item,
                        createdAt: format(new Date(item.createdAt), "yyyy-MM-dd HH:mm:ss"),
                    }));

                setUsersData(formattedData);
                setColumns([
                    {
                        name: 'nameInstituiton',
                        label: 'Nome da instituição',
                        options: {
                            filter: true,
                            sort: true,
                            filterType: "textField",
                        }
                    },
                    {
                        name: 'message',
                        label: 'Mensagem enviada',
                        options: {
                            filter: true,
                            sort: true,
                            filterType: "textField",
                        }
                    },
                    {
                        name: 'createdAt',
                        label: 'Data de envio',
                        options: {
                            filter: true,
                            sort: true,
                            filterType: "textField",
                        }
                    },
                ]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [currentUser]);

    return (
        <>
            <ExpandableTable
                data={userData}
                hideSelectable={true}
                columns={columns}
                title="Histórico de mensagens"
            />
        </>
    );
}

export default MessageHistoryList;
