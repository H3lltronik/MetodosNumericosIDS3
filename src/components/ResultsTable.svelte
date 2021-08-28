<script>
    import { Row, Col, TextField, Card, Radio, Button, DataTable, DataTableHead, DataTableRow, DataTableCell, DataTableBody, } from "svelte-materialify";
  
    let range = [-3, 3];
  </script>
  
  <Row class="pl-4 pr-4">
    <Col sm={12}>
      <div class="text-h6">Evaluations table</div>
    </Col>
    <Col sm={12}>
      <DataTable>
        <DataTableHead>
          <DataTableRow>
            <DataTableCell numeric>N</DataTableCell>
            <DataTableCell numeric>Negative X</DataTableCell>
            <DataTableCell numeric>Positive X</DataTableCell>
            <DataTableCell numeric>Aproximation Result</DataTableCell>
            <DataTableCell numeric>Expression Result</DataTableCell>
            <DataTableCell numeric>Error</DataTableCell>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          <DataTableRow>
            <DataTableCell numeric>1</DataTableCell>
            <DataTableCell numeric>24</DataTableCell>
            <DataTableCell numeric>24</DataTableCell>
            <DataTableCell numeric>24</DataTableCell>
            <DataTableCell numeric>24</DataTableCell>
            <DataTableCell numeric>24</DataTableCell>
          </DataTableRow>
        </DataTableBody>
    </DataTable>
    </Col>
  </Row>
  