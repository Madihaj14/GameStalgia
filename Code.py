import random

# Possible choices
choices = ['rock', 'paper', 'scissors']

# Function to decide the winner
def determine_winner(player_move, ai_move):
    if player_move == ai_move:
        return "It's a tie!"
    elif (player_move == 'rock' and ai_move == 'scissors') or \
         (player_move == 'scissors' and ai_move == 'paper') or \
         (player_move == 'paper' and ai_move == 'rock'):
        return 'You win!'
    else:
        return 'AI wins!'

# Main game loop
while True:
    player_move = input("Enter your move (rock, paper, scissors): ").lower()
    if player_move not in choices:
        print("Invalid move. Try again.")
        continue

    ai_move = random.choice(choices)
    print(f"AI chose: {ai_move}")
    
    # Determine and print the result
    result = determine_winner(player_move, ai_move)
    print(result)
    
    # Option to play again
    play_again = input("Play again? (yes/no): ").lower()
    if play_again != 'yes':
        break
