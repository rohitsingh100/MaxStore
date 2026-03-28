import React, { useRef, useState } from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Loader2, Upload, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
import useErrorLogout from "@/hooks/use-error-logout";
import axios from "axios";

const CreateProducts = () => {
  const [currentColor, setCurrentColor] = useState("#000000");
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const { handleErrorLogout } = useErrorLogout();

  const addColor = () => {
    if (!colors.includes(currentColor)) {
      setColors([...colors, currentColor]);
    }
  };

  const removeColor = (colorToRemove) => {
    setColors(colors.filter((color) => color !== colorToRemove));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      preview: URL.createObjectURL(file),
      file,
    }));

    setImages((prev) => [...prev, ...newImages].slice(0, 4));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const stock = e.target.stock.value;

    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !category ||
      colors.length === 0 ||
      images.length < 4
    ) {
      return toast({
        title: "Error",
        description: "Please fill all fields correctly",
      });
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);

    colors.forEach((color) => formData.append("colors", color));
    images.forEach((img) => formData.append("images", img.file));

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/products/create-product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast({
        title: "Success",
        description: res.data.message,
      });

      setColors([]);
      setImages([]);
      setCategory("");
      e.target.reset();
    } catch (error) {
      handleErrorLogout(error, "Error uploading product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Product</CardTitle>
        <CardDescription>
          Enter the details for the new product
        </CardDescription>
      </CardHeader>

      <form onSubmit={onSubmit}>
        <div className="flex flex-col lg:flex-row lg:w-[70vw]">
          <CardContent className="w-full space-y-4">
            <div>
              <Label>Product Name</Label>
              <Input name="name" required />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea name="description" rows={4} required />
            </div>

            <div>
              <Label>Price</Label>
              <Input name="price" type="number" min="1" required />
            </div>

            <div>
              <Label>Stock</Label>
              <Input name="stock" type="number" min="1" required />
            </div>
          </CardContent>

          <CardContent className="w-full space-y-4">
            <div>
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Keyboard">Keyboard</SelectItem>
                  <SelectItem value="Mouse">Mouse</SelectItem>
                  <SelectItem value="Headset">Headset</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Colors</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="w-12"
                />
                <Button type="button" onClick={addColor}>
                  Add
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {colors.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ background: c }} />
                  <X className="cursor-pointer" onClick={() => removeColor(c)} />
                </div>
              ))}
            </div>

            <div>
              <Label>Images (4 required)</Label>
              <div className="flex gap-3 flex-wrap">
                {images.map((img, i) => (
                  <div key={i} className="relative">
                    <img src={img.preview} className="w-24 h-24 rounded" />
                    <X
                      className="absolute -top-2 -right-2 cursor-pointer"
                      onClick={() => removeImage(i)}
                    />
                  </div>
                ))}

                {images.length < 4 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Upload />
                  </Button>
                )}
              </div>

              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageUpload}
              />
            </div>
          </CardContent>
        </div>

        <CardFooter>
          <Button className="w-full" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Product"}
          </Button>
        </CardFooter>
      </form>
    </div>
  );
};

export default CreateProducts;


