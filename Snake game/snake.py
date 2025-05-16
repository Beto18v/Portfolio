import pygame

class Snake:
    def __init__(self, screen_width, screen_height, block_size):
        self.block_size = block_size
        self.screen_width = screen_width
        self.screen_height = screen_height
        self.reset()
    
    def reset(self):
        # Start with a snake of length 5 in the middle of the screen
        self.length = 5
        self.positions = [
            ((self.screen_width // 2), (self.screen_height // 2)),
            ((self.screen_width // 2) - self.block_size, (self.screen_height // 2)),
            ((self.screen_width // 2) - (2 * self.block_size), (self.screen_height // 2))
        ]
        self.direction = (1, 0)  # Start moving right
    
    def change_direction(self, direction):
        self.direction = direction
    
    def move(self):
        # Calculate new head position
        head_x, head_y = self.positions[0]
        dir_x, dir_y = self.direction
        new_head = (
            head_x + (dir_x * self.block_size),
            head_y + (dir_y * self.block_size)
        )
        
        # Add new head to the beginning of positions list
        self.positions.insert(0, new_head)
        
        # Remove the tail if the snake hasn't eaten food
        if len(self.positions) > self.length:
            self.positions.pop()
    
    def grow(self):
        self.length += 1
    
    def check_collision_with_self(self):
        # Check if head collides with any part of the body
        head = self.positions[0]
        return head in self.positions[1:]
    
    def check_collision_with_walls(self):
        head_x, head_y = self.positions[0]
        return (
            head_x < 0 or 
            head_x >= self.screen_width or 
            head_y < 0 or 
            head_y >= self.screen_height
        )
    
    def draw(self, surface):
        # Draw the snake
        for i, (x, y) in enumerate(self.positions):
            color = (0, 255, 0) if i == 0 else (0, 200, 0)  # Head is slightly brighter
            pygame.draw.rect(surface, color, (x, y, self.block_size, self.block_size))
            
            # Draw eyes on the head
            if i == 0:
                # Determine eye positions based on direction
                if self.direction == (1, 0):  # Right
                    left_eye = (x + self.block_size - 5, y + 5)
                    right_eye = (x + self.block_size - 5, y + self.block_size - 5)
                elif self.direction == (-1, 0):  # Left
                    left_eye = (x + 5, y + 5)
                    right_eye = (x + 5, y + self.block_size - 5)
                elif self.direction == (0, -1):  # Up
                    left_eye = (x + 5, y + 5)
                    right_eye = (x + self.block_size - 5, y + 5)
                else:  # Down
                    left_eye = (x + 5, y + self.block_size - 5)
                    right_eye = (x + self.block_size - 5, y + self.block_size - 5)
                
                # Draw the eyes
                pygame.draw.circle(surface, (0, 0, 0), left_eye, 2)
                pygame.draw.circle(surface, (0, 0, 0), right_eye, 2)