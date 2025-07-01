import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  createMRTColumnHelper,
  
} from 'material-react-table';
import { Box, Button} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { data, type Lojas } from './makeData';
/* import { darken, lighten, useTheme } from '@mui/material'; */


const columnHelper = createMRTColumnHelper<Lojas>();


const columns = [
  columnHelper.accessor('nomeDaloja', {
    header: 'Nome da Loja',
    size: 120,
  }),
  columnHelper.accessor('franqueado', {
    header: 'Franqueado',
    size: 120,
  }),
  columnHelper.accessor('Cidade', {
    header: 'Cidade',
  }),
  columnHelper.accessor('Estado', {
    header: 'Estado',
  }),
  columnHelper.accessor('dataDeInauguracao', {
    header: 'Data de Inauguração',
    // Formatação da exibição
    Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString('pt-BR'),
    // Configurações para filtros
    filterVariant: 'date',
    filterFn: 'lessThan',
    sortingFn: 'datetime',
    // Estilo para o campo de filtro
    muiFilterTextFieldProps: {
      sx: {
        minWidth: '250px',
      },
    },
  }),
];

const csvConfig = mkConfig({
  filename: 'exportacao_lojas',
  useKeysAsHeaders: true,
  columnHeaders: ['Nome da Loja', 'Franqueado', 'Cidade', 'Estado', 'Data de Inauguração'], // Cabeçalhos customizados
  fieldSeparator: ';', // Usar ponto-e-vírgula para melhor compatibilidade com Excel PT-BR
  decimalSeparator: ',',
  quoteStrings: true,
  useBom: true,
});
const Example = () => {



/*   const theme = useTheme();
  const baseBackgroundColor = theme.palette.background.default; */

  const handleExportRows = (rows: MRT_Row<Lojas>[]) => {
    const rowData = rows.map((row) => ({
      ...row.original,
      dataDeInauguracao: row.original.dataDeInauguracao.toLocaleString() // Converte para formato YYYY-MM-DD
    }));
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const dataForExport = data.map(loja => ({
      'Nome da Loja': loja.nomeDaloja,
      'Franqueado': loja.franqueado ,
      'Cidade': loja.Cidade,
      'Estado': loja.Estado,
      'Data de Inauguração': loja.dataDeInauguracao.toLocaleString()
    }));
    
    const csv = generateCsv(csvConfig)(dataForExport);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
/*     mrtTheme: (theme:Theme) => ({
      baseBackgroundColor: darken(baseBackgroundColor, 0.1), // Escurece em 10%
    }), */
    localization: {
      actions: 'Ações',
      cancel: 'Cancelar',
      clearFilter: 'Limpar filtro',
      clearSearch: 'Limpar busca',
      clearSort: 'Limpar ordenação',
      columnActions: 'Ações da coluna',
      clearSelection: "Limpar seleção",
      selectedCountOfRowCountRowsSelected: '{selectedCount} de {rowCount} Linhas selecionadas',
      edit: 'Editar',
      expand: 'Expandir',
      filterByColumn: 'Filtrar por {column}',
      filterMode: 'Modo de filtro',
      hideAll: 'Ocultar tudo',
      hideColumn: 'Ocultar coluna',
      rowActions: 'Ações da linha',
      save: 'Salvar',
      search: 'Buscar',
      select: 'Selecionar',
      showAll: 'Mostrar tudo',
      showHideColumns: 'Mostrar/ocultar colunas',
      showHideFilters: 'Mostrar/ocultar filtros',
      showHideSearch: 'Mostrar/ocultar busca',
      sortByColumnAsc: 'Ordenar por {column} (A-Z)',
      sortByColumnDesc: 'Ordenar por {column} (Z-A)',
      thenBy: ', depois por ',
      toggleDensity: 'Alternar densidade',
      toggleFullScreen: 'Tela cheia',
      toggleSelectAll: 'Selecionar todos',
      toggleSelectRow: 'Selecionar linha',
      rowsPerPage: 'Linhas por página', // Traduz "Rows per page"
      of: 'de', // Traduz "of" (ex: "1-5 of 10" → "1-5 de 10")
    },

    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Gerar Csv de toda a tabela
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
           Gerar Csv de toda as Linhas
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
           Gerar Csv de toda as linhas da página
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
           Gerar Csv da linha selecionada
        </Button>
      </Box>
    ),
  });

    return <MaterialReactTable table={table} />

   
}

export default Example;