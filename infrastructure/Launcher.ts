import { App } from "aws-cdk-lib";
import { SpaceStack } from "./SpaceStack";


const app = new App()
new SpaceStack(app, "Space-finder-00",{
    stackName:"SpaceFinder-0137"
})
