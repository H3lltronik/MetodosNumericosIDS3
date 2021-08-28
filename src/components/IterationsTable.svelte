<script>
    import { Row, Col, TextField, Card, Radio, Button, DataTable, DataTableHead, DataTableRow, DataTableCell, DataTableBody, } from "svelte-materialify";
  
    let range = [-3, 3];
  </script>
  
  <Row class="pl-4 pr-4">
    <Col sm={12}>
      <div class="text-h6">Evaluations table</div>
    </Col>
    <Col sm={12} lg={6}>
        <TextField
          filled dense
          type="number"
          bind:value={range[0]}
        >
          <span>From</span>
        </TextField>
    </Col>
    <Col sm={12} lg={6}>
        <TextField
          filled dense
          type="number"
          bind:value={range[1]}
        >
          <span>To</span>
        </TextField>
    </Col>
    <Col sm={12}>
        <Button block>GO</Button>
    </Col>
    <Col sm={12}>
        <Row style="justify-content: center;">
            <DataTable>
                <DataTableHead>
                  <DataTableRow>
                    <DataTableCell numeric>X</DataTableCell>
                    <DataTableCell numeric>Y</DataTableCell>
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                  <DataTableRow>
                    <DataTableCell numeric>1</DataTableCell>
                    <DataTableCell numeric>24</DataTableCell>
                  </DataTableRow>
                  <DataTableRow>
                    <DataTableCell numeric>2</DataTableCell>
                    <DataTableCell numeric>37</DataTableCell>
                  </DataTableRow>
                  <DataTableRow>
                    <DataTableCell numeric>3</DataTableCell>
                    <DataTableCell numeric>24</DataTableCell>
                  </DataTableRow>
                </DataTableBody>
            </DataTable>
        </Row>
    </Col>
  </Row>
  