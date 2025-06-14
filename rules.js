class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Start.");
        this.engine.puzzleSolved = false;
        this.engine.penHave = false;
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        if (this.engine.penHave) { this.engine.storyData.PenBody; }
        
        if(locationData.Choices) { // TODO: check if the location has any Choices
            if (locationData.Body == "A room with electrical connections now made.") { this.engine.puzzleSolve = true; }
            if (locationData.Body == "The cabinets in front of you are uncharacteristically orderly when compared to the others. You attempt to open them, but they refuse to budge, the locks somehow not buckling under their rust. However, you do find and pocket a pen.") { 
                this.engine.penHave = true; }
            
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                if (this.engine.puzzleSolve) {
                    if (!(choice.Target == "Puzzle Room (Unsolved)") && !(choice.Target == "Exit (Closed)")) {
                        this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                    }
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
                } else {
                    if (choice.Text != "Approach the heavy door now humming.") { this.engine.addChoice(choice.Text, choice); }
                }
            }
            } else {
                this.engine.addChoice("The end.")
            }
    }

    handleChoice(choice) {
        if (choice) {
            if (choice == "")
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}


class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');