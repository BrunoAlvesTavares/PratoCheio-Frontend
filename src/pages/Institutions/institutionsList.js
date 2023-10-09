import React, { useState, useEffect, useCallback } from 'react';
import { SwalWithMui, Toast } from '../../components/swal';
import { useNavigate } from 'react-router-dom';
import ExpandableTable from '../../components/ExpandableTable/ExpandableTable';
import PopperButton from '../../components/PopperButton/index';
import FloatButton from '../../components/FloatButton/index';
import OperationDropdown from '../../components/operationDropdown';
import { getCurrentUser } from '../../utils/auth';
import api from '../../utils/api';

export function InstitutionsList() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [institutionsData, setInstitutionsData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [reload, setReload] = useState(true);

  const handleDelete = useCallback(async (ids) => {
    SwalWithMui.fire({
      title: "Você tem certeza?",
      text: "Esta ação removerá a(s) Instituições(s) selecionado(s). Ela não poderá ser desfeita",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      confirmButtonColor: "#EF6C00",
      confirmButtonText: "Sim, remover",
      denyButtonColor: "#EF6C00",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/institutions/${ids}`).then(() => {
          setReload(!reload);
          Toast.fire({
            title: "Sucesso!",
            text: "Instituição(s) removida(s) com sucesso",
            icon: "success",
          });
          navigate("/institutions");
        }).catch(err => {
          Toast.fire({
            title: "Erro ao deletar",
            text: err.response.data.stacktrace,
            icon: "error",
          });
        });
      } else {
        navigate("/institutions");
        SwalWithMui.fire({
          title: "Operação cancelada",
          text: "Nenhum usuário foi removido",
          icon: "info",
        });
      }
    });
  }, [navigate, reload]);

  useEffect(() => {
    api.get('/institutions')
      .then(response => {
        console.log(currentUser);
        setInstitutionsData(response.data);
        const newColumns = [
          {
            name: 'name',
            label: 'Nome',
            options: {
              filter: true,
              sort: true,
              filterType: 'textField',
            },
          },
          {
            name: 'location',
            label: 'Localização',
            options: {
              filter: true,
              sort: true,
              filterType: 'textField',
            },
          },
          {
            name: 'description',
            label: 'Descrição',
            options: {
              filter: true,
              sort: true,
              filterType: 'textField',
            },
          },
          {
            name: 'establishedYear',
            label: 'Ano de Fundação',
            options: {
              filter: true,
              sort: true,
              filterType: 'textField',
            },
          },
          {
            name: 'contactEmail',
            label: 'Email de Contato',
            options: {
              filter: true,
              sort: true,
              filterType: 'textField',
            },
          },
          {
            name: 'website',
            label: 'Website',
            options: {
              filter: true,
              sort: true,
              filterType: 'textField',
            },
          },
            {
            name: 'pix',
            label: 'Chave pix',
            options: {
              filter: true,
              sort: true,
              filterType: 'textField',
            },
          },
        ];

        if (currentUser.accessLevel === 'admin' || currentUser.accessLevel === 'manager') {
          newColumns.push({
            name: '_id',
            label: 'Operações',
            options: {
              filter: false,
              sort: false,
              customBodyRenderLite: (dataIndex) => {
                const url = `/institutions/${response.data[dataIndex]._id}/edit`;
                const urlMessage = `/institutions/${response.data[dataIndex]._id}/message`
                const items = [
                  {
                    label: 'Editar Instituição',
                    onclick: () => navigate(url),
                  },
                  {
                    label: 'Enviar Pedido',
                    onclick: () => navigate(urlMessage),
                  },
                ];
                return <OperationDropdown items={items} />;
              },
            },
          });
        }

        setColumns(newColumns);
      })
      .catch(error => {
        console.log(error);
      });
  }, [navigate, currentUser.accessLevel]);

  async function onRowsDelete(rowsDeleted) {
    const ids = rowsDeleted.data.map(row => institutionsData[row.dataIndex]._id);
    await handleDelete(ids);
  }

  return (
    <>
      <ExpandableTable
        onRowsDelete={currentUser.accessLevel === 'admin' || currentUser.accessLevel === 'manager' ? onRowsDelete : null}
        hideSelectable={currentUser.accessLevel !== 'admin'}
        data={institutionsData}
        columns={columns}
        title="Lista de Instituições"
      />
      {currentUser.accessLevel === 'admin' && (
        <PopperButton url="/institutions" >
          <FloatButton url="/institutions" />
        </PopperButton>
      )}
    </>
  );
}
