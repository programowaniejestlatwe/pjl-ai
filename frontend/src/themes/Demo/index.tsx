import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Link,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
  FormControl,
  Radio,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import * as RouterLink from "next/link";
import Button from "@mui/material/Button";
import { error, neutral, primary, success, warning } from "@/themes/colors";
import { ColorTile } from "@/themes/Demo/ColorTile";
import SimpleRadioOption from "@/themes/components/SimpleRadioOption";
import RadioOption from "@/themes/components/RadioOption";
import { useState } from "react";
import Matching from "@/themes/components/Matching";
import loadingImg from "@/public/img/loading.png";

import LoadingBackdrop from "@/themes/components/LoadingBackdrop";
import Panel from "@/themes/components/Panel";

const Demo = () => {
  const [radioWithContent, setRadioWithContent] = useState("1");
  const [simpleRadio, setSimpleRadio] = useState("1");
  const [showLoading, setShowLoading] = useState(false);
  const [isPanelContentExpanded, setIsPanelContentExpanded] = useState(false);

  return (
    <>
      <Box p={4}>
        <Box pt={2}>
          <Card>
            <CardHeader title={"Typography"}></CardHeader>
            <CardContent>
              <Box display={"flex"} flexDirection={"column"} py={2}>
                <Typography variant={"text"}>header</Typography>
                <Typography variant={"header"}>
                  The quick brown fox jumps over the lazy dog
                </Typography>
                <Typography variant={"text"}>headerAccent</Typography>
                <Typography variant={"headerAccent"}>
                  The quick brown fox jumps over the lazy dog
                </Typography>
              </Box>
              <Box display={"flex"} flexDirection={"column"} py={2}>
                <Typography variant={"text"}>subheader</Typography>
                <Typography variant={"subheader"}>
                  The quick brown fox jumps over the lazy dog
                </Typography>
              </Box>
              <Box display={"flex"} flexDirection={"column"} py={2}>
                <Typography variant={"text"}>text</Typography>
                <Typography variant={"text"}>
                  The quick brown fox jumps over the lazy dog
                </Typography>
                <Typography variant={"text"}>textAccent</Typography>
                <Typography variant={"textAccent"}>
                  The quick brown fox jumps over the lazy dog
                </Typography>
                <Typography variant={"text"}>Link</Typography>
                <Link href={"/f"}>Text / Link</Link>
              </Box>
              <Box display={"flex"} flexDirection={"column"} py={2}>
                <Typography variant={"text"}>button text</Typography>
                <Typography variant={"button"}>Button text/main</Typography>
                <Typography variant={"text"}>buttonSmall</Typography>
                <Typography variant={"buttonSmall"}>
                  Button text/small
                </Typography>
              </Box>
              <Box display={"flex"} flexDirection={"column"} py={2}>
                <Typography variant={"text"}>small</Typography>
                <Typography variant={"small"}>
                  The quick brown fox jumps over the lazy dog
                </Typography>
                <Typography variant={"text"}>smallAccent</Typography>
                <Typography variant={"smallAccent"}>
                  The quick brown fox jumps over the lazy dog
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box pt={2}>
          <Card>
            <CardHeader title={"Buttons"} />
            <CardContent>
              <Typography variant={"text"}>primary contained</Typography>
              <Box display={"flex"} flexDirection={"row"} py={2} gap={2}>
                <Button variant={"contained"} color={"primary"}>
                  Default
                </Button>
                <Button variant={"contained"} color={"primary"} disabled={true}>
                  Disabled s
                </Button>
              </Box>
              <Typography variant={"text"}>secondary contained</Typography>
              <Box display={"flex"} flexDirection={"row"} py={2} gap={2}>
                <Button variant={"outlined"} color={"primary"}>
                  Default
                </Button>
                <Button variant={"outlined"} disabled={true} color={"primary"}>
                  Disabled
                </Button>
              </Box>
              <Typography variant={"text"}>text</Typography>
              <Box display={"flex"} flexDirection={"row"} py={2} gap={2}>
                <Button variant={"text"}>Default</Button>
                <Button variant={"text"} disabled={true}>
                  Disabled
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box pt={2}>
          <Card>
            <CardHeader title={"Colors"} />
            <CardContent>
              <Box>
                <Box>
                  <Typography variant={"text"} display={"block"}>
                    Primary
                  </Typography>
                  <Typography variant={"small"}>
                    The main brand color
                  </Typography>
                </Box>
                <Box display={"flex"} flexDirection={"row"} py={2} gap={2}>
                  <ColorTile
                    bgColor={primary[600]}
                    labelColor={neutral[0]}
                    label={"primary / 600"}
                  />
                  <ColorTile
                    bgColor={primary[500]}
                    labelColor={neutral[0]}
                    label={"primary / 500"}
                  />
                  <ColorTile
                    bgColor={primary[400]}
                    labelColor={neutral[0]}
                    label={"primary / 400"}
                  />
                  <ColorTile
                    bgColor={primary[300]}
                    labelColor={neutral[0]}
                    label={"primary / 300"}
                  />
                  <ColorTile
                    bgColor={primary[200]}
                    labelColor={neutral[600]}
                    label={"primary / 200"}
                  />
                  <ColorTile
                    bgColor={primary[100]}
                    labelColor={neutral[600]}
                    label={"primary / 100"}
                  />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Typography variant={"text"} display={"block"}>
                    Neutral
                  </Typography>
                  <Typography variant={"small"}>
                    For all kinds of grayish elements
                  </Typography>
                </Box>
                <Box display={"flex"} flexDirection={"row"} py={2} gap={2}>
                  <ColorTile
                    bgColor={neutral[600]}
                    labelColor={neutral[0]}
                    label={"neutral / 600"}
                  />
                  <ColorTile
                    bgColor={neutral[500]}
                    labelColor={neutral[0]}
                    label={"neutral / 500"}
                  />
                  <ColorTile
                    bgColor={neutral[400]}
                    labelColor={neutral[600]}
                    label={"neutral / 400"}
                  />
                  <ColorTile
                    bgColor={neutral[300]}
                    labelColor={neutral[600]}
                    label={"primary / 300"}
                  />
                  <ColorTile
                    bgColor={neutral[200]}
                    labelColor={neutral[600]}
                    label={"neutral / 200"}
                  />
                  <ColorTile
                    bgColor={neutral[100]}
                    labelColor={neutral[600]}
                    label={"neutral / 100"}
                  />
                  <ColorTile
                    bgColor={neutral[0]}
                    labelColor={neutral[600]}
                    label={"neutral / 0"}
                  />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Typography variant={"text"} display={"block"}>
                    Neutral
                  </Typography>
                  <Typography variant={"small"}>
                    For the accomplished goals and other successful operations
                  </Typography>
                </Box>
                <Box display={"flex"} flexDirection={"row"} py={2} gap={2}>
                  <ColorTile
                    bgColor={success.medium}
                    labelColor={neutral[600]}
                    label={"success / medium"}
                  />
                  <ColorTile
                    bgColor={success.light}
                    labelColor={neutral[600]}
                    label={"success / light"}
                  />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Typography variant={"text"} display={"block"}>
                    Warning
                  </Typography>
                  <Typography variant={"small"}>To warn a user </Typography>
                </Box>
                <Box display={"flex"} flexDirection={"row"} py={2} gap={2}>
                  <ColorTile
                    bgColor={warning.medium}
                    labelColor={neutral[600]}
                    label={"success / medium"}
                  />
                  <ColorTile
                    bgColor={warning.light}
                    labelColor={neutral[600]}
                    label={"warning / light"}
                  />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Typography variant={"text"} display={"block"}>
                    Error
                  </Typography>
                  <Typography variant={"small"}>
                    Elements displaying error should use this color
                  </Typography>
                </Box>
                <Box display={"flex"} flexDirection={"row"} py={2} gap={2}>
                  <ColorTile
                    bgColor={error.medium}
                    labelColor={neutral[0]}
                    label={"error / medium"}
                  />
                  <ColorTile
                    bgColor={error.light}
                    labelColor={neutral[600]}
                    label={"error / light"}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box pt={2}>
          <Card>
            <CardHeader title={"Forms"} />
            <CardContent>
              <Box>
                <Typography variant={"text"}>Text field</Typography>
                <Box display={"flex"}>
                  <TextField
                    multiline
                    rows={4}
                    id="outlined-basic"
                    variant="outlined"
                    placeholder={"Placeholder"}
                    fullWidth={true}
                  />
                </Box>
                <Box pt={4}>
                  <Typography variant={"text"}>Button group</Typography>
                  <Box>
                    <ToggleButtonGroup
                      orientation="horizontal"
                      exclusive
                      fullWidth={true}
                      value={"module"}
                    >
                      <ToggleButton value="list" aria-label="list">
                        a
                      </ToggleButton>
                      <ToggleButton value="module" aria-label="module">
                        b
                      </ToggleButton>
                      <ToggleButton value="quilt" aria-label="quilt">
                        c
                      </ToggleButton>
                      <ToggleButton value="quilt" aria-label="quilt">
                        c
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </Box>
                <Box pt={4}>
                  <Typography variant={"text"}>Dropdown</Typography>
                  <FormControl fullWidth>
                    <Select id="demo-simple-select" defaultValue={20}>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box pt={4}>
                <Typography variant={"text"}>Radio</Typography>
                <Box>
                  <Radio size={"small"} />
                  <Radio size={"small"} checked />
                  <Radio size={"small"} />
                </Box>
              </Box>
              <Box pt={4}>
                <Typography variant={"text"}>Progress</Typography>
                <Box>
                  <Matching value={51} />
                </Box>
              </Box>

              <Box pt={4}>
                <Typography variant={"text"}>Simple radio option</Typography>
                <Stack gap={1}>
                  <SimpleRadioOption
                    label={"1.2 100kw 129 km"}
                    value={"1"}
                    onChange={() => setSimpleRadio("1")}
                    checked={simpleRadio === "1"}
                  />
                  <SimpleRadioOption
                    label={"1.2 100kw 129 km"}
                    value={"2"}
                    onChange={() => setSimpleRadio("2")}
                    checked={simpleRadio === "2"}
                  />
                </Stack>
              </Box>
              <Box pt={4}>
                <Typography variant={"text"}>
                  Simple radio option with content
                </Typography>
                <Stack gap={1}>
                  <SimpleRadioOption
                    label={"1.2 100kw 129 km"}
                    value={"1"}
                    onChange={() => setSimpleRadio("1")}
                    checked={simpleRadio === "1"}
                    rightComponent={<Matching value={51} />}
                  />
                  <SimpleRadioOption
                    label={"1.2 100kw 129 km"}
                    value={"3"}
                    onChange={() => setSimpleRadio("3")}
                    checked={simpleRadio === "3"}
                    rightComponent={<Matching value={51} isLoading />}
                    isLoading
                  />
                </Stack>
              </Box>
              <Box pt={4}>
                <Typography variant={"text"}>
                  Simple radio with content
                </Typography>
                <Stack gap={1}>
                  <RadioOption
                    label={"1.2 100kw 129 km"}
                    value={"1"}
                    onChange={() => setRadioWithContent("1")}
                    checked={radioWithContent === "1"}
                  >
                    <Typography variant={"smallAccent"}>
                      Select the car’s motor type:
                      <Stack pt={1} gap={1}>
                        <SimpleRadioOption
                          label={"1.2kw"}
                          value={"1"}
                          onChange={() => {}}
                        />
                        <SimpleRadioOption
                          label={"1.2kw"}
                          value={"1"}
                          onChange={() => {}}
                          checked
                        />
                      </Stack>
                    </Typography>
                  </RadioOption>
                  <RadioOption
                    label={"1.2 100kw 129 km"}
                    value={"2"}
                    onChange={() => setRadioWithContent("2")}
                    checked={radioWithContent === "2"}
                  />
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box pt={2}>
          <Card>
            <CardHeader title={"Icons"} />
            <CardContent>
              <Box>
                <Box>
                  <EditIcon color={"primary"} fontSize={"small"} />
                  <CloseIcon color={"primary"} fontSize={"small"} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box pt={2}>
          <Card>
            <CardHeader title={"Loading"} />
            <CardContent>
              <Box>
                <Box>
                  <Button
                    variant={"contained"}
                    color={"primary"}
                    onClick={() => {
                      setShowLoading(true);
                      setTimeout(() => {
                        setShowLoading(false);
                      }, 2000);
                    }}
                  >
                    Open backdrop
                  </Button>
                  <LoadingBackdrop open={showLoading} image={"/img/loading.png"} title={"Loading"} description={"Wait patiently"}/>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box pt={2}>
          <Card>
            <CardHeader title={"Panels"} />
            <CardContent>
              <Box pb={4}>
                <Typography variant={"text"}>Panel with header only</Typography>
                <Panel step={1} title={"Informacje o samochodzie"} />
              </Box>
              <Box pb={4}>
                <Typography variant={"text"}>Panel with summary</Typography>
                <Panel
                  step={1}
                  title={"Informacje o samochodzie"}
                  subheader={
                    "B-Max, MKI (1996-2001), Liftback, Gasoline, 1.2 100kw 129 km"
                  }
                />
              </Box>
              <Box pb={4}>
                <Typography variant={"text"}>
                  Panel with summary and edit
                </Typography>
                <Panel
                  step={1}
                  title={"Informacje o samochodzie"}
                  subheader={
                    "B-Max, MKI (1996-2001), Liftback, Gasoline, 1.2 100kw 129 km"
                  }
                  showEdit={true}
                />
              </Box>
              <Box pb={4}>
                <Typography variant={"text"}>
                  Panel with content open
                </Typography>
                <Panel
                  step={1}
                  title={"Informacje o samochodzie"}
                  isContentExpanded={true}
                  footer={
                    <Button
                      variant={"contained"}
                      onClick={() => setIsPanelContentExpanded(false)}
                    >
                      Diagnose
                    </Button>
                  }
                >
                  <Stack gap={1}>
                    <SimpleRadioOption
                      label={"1.2 100kw 129 km"}
                      value={"1"}
                      onChange={() => setSimpleRadio("1")}
                      checked={simpleRadio === "1"}
                      rightComponent={<Matching value={51} />}
                    />
                    <SimpleRadioOption
                      label={"1.2 100kw 129 km"}
                      value={"3"}
                      onChange={() => setSimpleRadio("3")}
                      checked={simpleRadio === "3"}
                      rightComponent={<Matching value={51} isLoading />}
                      isLoading
                    />
                  </Stack>
                </Panel>
              </Box>
              <Box pb={4}>
                <Typography variant={"text"}>
                  Panel with content collapsed, expandable
                </Typography>
                <Panel
                  step={1}
                  title={"Informacje o samochodzie"}
                  subheader={
                    "B-Max, MKI (1996-2001), Liftback, Gasoline, 1.2 100kw 129 km"
                  }
                  isContentExpanded={isPanelContentExpanded}
                  showEdit={!isPanelContentExpanded}
                  onEdit={() => setIsPanelContentExpanded(true)}
                  footer={
                    <Button
                      variant={"contained"}
                      onClick={() => setIsPanelContentExpanded(false)}
                    >
                      Diagnose
                    </Button>
                  }
                >
                  <Stack gap={1}>
                    <SimpleRadioOption
                      label={"1.2 100kw 129 km"}
                      value={"1"}
                      onChange={() => setSimpleRadio("1")}
                      checked={simpleRadio === "1"}
                      rightComponent={<Matching value={51} />}
                    />
                    <SimpleRadioOption
                      label={"1.2 100kw 129 km"}
                      value={"3"}
                      onChange={() => setSimpleRadio("3")}
                      checked={simpleRadio === "3"}
                      rightComponent={<Matching value={51} isLoading />}
                      isLoading
                    />
                  </Stack>
                </Panel>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Demo;
