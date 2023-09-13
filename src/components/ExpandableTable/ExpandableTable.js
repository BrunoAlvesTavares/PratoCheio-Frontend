import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Button from '@mui/material/Button';

import Menu from "../menu/menu";

function ExpandableTable({
  data,
  columns,
  onRowsDelete,
  title,
  hideSelectable = false,
  loading = false,
  download = false,
  type,
}) {
  const [menuOpen, setMenuOpen] = useState(true);
  const [tableWidth, setTableWidth] = useState(null);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    setTableWidth(menuOpen ? "82%" : "100%");
  }, [menuOpen]);

  let options = {
    expandableRows: false,
    expandableRowsHeader: false,
    isRowExpandable: (dataIndex, expandedRows) => {
      if (dataIndex === 3 || dataIndex === 4) return false;

      if (
        expandedRows.data.length > 4 &&
        expandedRows.data.filter((d) => d.dataIndex === dataIndex).length ===
        0
      )
        return false;
      return true;
    },
    filterType: "checkbox",
    selectableRowsHeader: false,
    onRowsDelete: onRowsDelete,
    download: download,
    downloadOptions: {
      separator: ";",
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      },
    },
    textLabels: {
      pagination: {
        next: "Próxima página",
        previous: "Página anterior",
        rowsPerPage: "Registros por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Pesquisar",
        downloadCsv: "Baixar CSV",
        print: "Imprimir",
        viewColumns: "Colunas",
        filterTable: "Filtos",
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "LIMPAR",
      },
      viewColumns: {
        title: "Mostrar Colunas",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "linhas selecionadas",
        delete: "Remover",
        deleteAria: "Remover Linhas Selecionadas",
      },
    },
  };
  if (hideSelectable) {
    options.isRowSelectable = () => false;
    options.selectableRowsHideCheckboxes = true;
  }

  return (
    <>
      <div style={{
       width: tableWidth,
       marginLeft: menuOpen ? '18%' : 'auto',
       marginRight: 'auto'
      }}
      >
        <Button onClick={handleMenuOpen} >
          <MenuOpenIcon style={{color: '#64B5F6'}}/>
        </Button>
        <MUIDataTable title={title} data={data} columns={columns} options={options} />
      </div>
      {menuOpen && <Menu open={menuOpen} onClose={handleMenuClose} />}
    </>
  );
}

export default ExpandableTable;
